'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/auth'; // ваш путь к настройкам auth

// Получить корзину текущего пользователя
export async function getCart() {
	const session = await auth();
	const cookieStore = await cookies();
	const token = cookieStore.get('sessionId')?.value;
	const email = session?.user?.email;

	if (!token && !session) {
		throw new Error('No JWT found or user');
	}
	const cart = await prisma.cartItem.findMany({
		where: { sessionId: email || token },
		include: {
			product: true
		}
	});

	return cart || null;
}

export async function addToCart(productId: string, quantity: number = 1) {
	const session = await auth();
	const cookieStore = await cookies();
	const token = cookieStore.get('sessionId')?.value;
	const email = session?.user?.email;

	if (!token && !session) {
		throw new Error('No JWT found or user');
	}

	const itemsInCart = await prisma.cartItem.findFirst({
		where: { sessionId: email || token, productId }
	});

	if (itemsInCart) {
		await prisma.cartItem.update({
			where: { id: itemsInCart.id },
			data: { quantity: itemsInCart.quantity + quantity }
		});
	} else {
		await prisma.cartItem.create({
			data: {
				sessionId: email || token,
				product: {
					connect: { id: productId }
				},
				quantity
			}
		});
	}

	revalidatePath('/cart');
}

export async function updateCartItemQuantity(itemId: string, newQuantity: number) {
	if (newQuantity < 0) throw new Error('Количество не может быть отрицательным');
	const session = await auth();
	const cookieStore = await cookies();
	const token = cookieStore.get('sessionId')?.value;
	const email = session?.user?.email;

	if (!email && !token) throw new Error('Не авторизован');

	const item = await prisma.cartItem.findUnique({
		where: { id: itemId, sessionId: email || token },
		include: { product: true }
	});

	if (!item) {
		throw new Error('Доступ запрещён');
	}

	if (newQuantity === 0) {
		await prisma.cartItem.delete({ where: { id: itemId } });
	} else {
		await prisma.cartItem.update({
			where: { id: itemId },
			data: { quantity: newQuantity }
		});
	}

	revalidatePath('/cart');
}

export async function clearCart() {
	const session = await auth();
	const cookieStore = await cookies();
	const token = cookieStore.get('sessionId')?.value;
	const email = session?.user?.email;

	if (!email && !token) throw new Error('Не авторизован');

	await prisma.cartItem.deleteMany({
		where: { sessionId: email || token }
	});

	revalidatePath('/cart');
}

export async function moveCartToRegUser() {
	const session = await auth();
	const cookieStore = await cookies();
	const token = cookieStore.get('sessionId')?.value;
	const email = session?.user?.email;

	if (!email || !token) throw new Error('Не авторизован');

	await prisma.$transaction(async (tx) => {
		const guestItems = await tx.cartItem.findMany({
			where: { sessionId: token }
		});

		if (guestItems.length === 0) {
			return;
		}

		const userItems = await tx.cartItem.findMany({
			where: { sessionId: email },
			select: { id: true, productId: true, quantity: true }
		});

		const userMap = new Map<string, { id: string; quantity: number }>();
		for (const item of userItems) {
			userMap.set(item.productId, { id: item.id, quantity: item.quantity });
		}

		for (const guest of guestItems) {
			const existing = userMap.get(guest.productId);
			if (existing) {
				await tx.cartItem.update({
					where: { id: existing.id },
					data: { quantity: existing.quantity + guest.quantity }
				});
			} else {
				await tx.cartItem.create({
					data: {
						sessionId: email,
						productId: guest.productId,
						quantity: guest.quantity
					}
				});
			}
		}

		await tx.cartItem.deleteMany({
			where: { sessionId: token }
		});
	});

	revalidatePath('/cart');
}
