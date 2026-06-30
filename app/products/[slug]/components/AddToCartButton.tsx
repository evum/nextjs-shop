'use client';

import { addToCart } from '@/app/actions/cart';
import { useTransition } from 'react';

type AddToCartButtonProps = {
	productId: string;
	disabled?: boolean;
};

export default function AddToCartButton({ productId, disabled = false }: AddToCartButtonProps) {
	const [isPending, startTransition] = useTransition();

	const handleAdd = () => {
		startTransition(async () => {
			try {
				await addToCart(productId, 1);
				alert('Товар добавлен в корзину!');
			} catch (error) {
				console.error('Ошибка добавления в корзину:', error);
				alert('Не удалось добавить товар. Попробуйте позже.');
			}
		});
	};

	return (
		<button
			onClick={handleAdd}
			disabled={disabled || isPending}
			className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition ${
				disabled || isPending
					? 'bg-gray-400 cursor-not-allowed'
					: 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
			}`}
		>
			{isPending ? 'Добавление...' : 'Добавить в корзину'}
		</button>
	);
}
