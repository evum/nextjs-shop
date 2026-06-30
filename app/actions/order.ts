// app/actions/order.ts
'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { PaymentMethod, ShippingType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrder(formData: FormData) {
	const session = await auth();
	if (!session?.user?.id) {
		throw new Error('Unauthorized');
	}

	const userId = session.user.id;
	const email = session.user.email;
	const shippingAddress = formData.get('shippingAddress') as string;
	const shippingType = formData.get('shippingType') as ShippingType;
	const paymentMethod = formData.get('paymentMethod') as PaymentMethod;

	if (
		!shippingAddress ||
		!shippingType ||
		!Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)
	) {
		throw new Error('All fields are required');
	}

	const cartItems = await prisma.cartItem.findMany({
		where: { sessionId: email },
		include: { product: true }
	});

	if (cartItems.length === 0) {
		throw new Error('Cart is empty');
	}

	let total = 0;
	const orderItemsData = cartItems.map((item) => {
		total += item.quantity * item.product.price;
		return {
			productId: item.productId,
			quantity: item.quantity
		};
	});

	const order = await prisma.$transaction(async (tx) => {
		const newOrder = await tx.order.create({
			data: {
				user: { connect: { id: userId } },
				status: 'PENDING',
				total,
				shippingAddress,
				shippingType: shippingType,
				paymentMethod,
				ItemsInOrder: {
					create: orderItemsData
				}
			}
		});

		await tx.cartItem.deleteMany({ where: { sessionId: email } });

		return newOrder;
	});

	revalidatePath('/checkout');
	redirect(`/order/${order.id}`);
}

export async function getOrder(id: string) {
	const session = await auth();
	if (!session?.user?.id) {
		throw new Error('Unauthorized');
	}

	const userId = session.user.id;
	const order = await prisma.order.findUnique({
		where: { id, userId },
		include: { ItemsInOrder: { include: { product: true } } }
	});
	if (!order) {
		throw new Error('Can`t find order');
	}
	return order;
}
