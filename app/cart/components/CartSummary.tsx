'use client';

import { clearCart } from '@/app/actions/cart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type CartSummaryProps = {
	totalItems: number;
	totalPrice: number;
};

export default function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
	const router = useRouter();
	const session = useSession();

	const handleClear = async () => {
		if (confirm('Очистить корзину?')) {
			await clearCart();
			router.refresh();
		}
	};

	const onCheckoutClick = () => {
		if (!session?.data?.user) {
			alert('Для оформления заказа необходимо войти в аккаунт');
			router.push('/login?callbackUrl=/checkout');
			return;
		}
		router.push('/checkout');
	};

	return (
		<div className="bg-gray-50 p-6 rounded-lg shadow-sm">
			<h2 className="text-xl font-bold mb-4">Итого</h2>
			<div className="flex justify-between text-lg mb-2">
				<span>Товаров:</span>
				<span>{totalItems}</span>
			</div>
			<div className="flex justify-between text-2xl font-bold text-blue-600 border-t pt-2">
				<span>Сумма:</span>
				<span>{totalPrice} ₽</span>
			</div>
			<button
				onClick={handleClear}
				className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition cursor-pointer"
			>
				Очистить корзину
			</button>
			<button
				onClick={onCheckoutClick}
				className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
			>
				Оформить заказ
			</button>
		</div>
	);
}
