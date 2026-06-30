'use client';

import { updateCartItemQuantity } from '@/app/actions/cart';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

type CartItemProps = {
	id: string;
	product: Product;
	quantity: number;
};

export default function CartItem({ id, product, quantity }: CartItemProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleQuantityChange = async (newQuantity: number) => {
		if (newQuantity < 0) return;
		setIsLoading(true);
		try {
			await updateCartItemQuantity(id, newQuantity);
		} catch (error) {
			console.error('Ошибка обновления количества:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemove = async () => {
		setIsLoading(true);
		try {
			await updateCartItemQuantity(id, 0);
		} catch (error) {
			console.error('Ошибка удаления:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const totalPrice = product.price * quantity;

	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b py-4">
			<div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden shrink-0">
				<Image
					src={product.images[0] || '/images/placeholder.png'}
					alt={product.name}
					fill
					className="object-cover"
				/>
			</div>

			<div className="flex-1 min-w-0">
				<h3 className="font-medium text-lg truncate">{product.name}</h3>
				<p className="text-gray-600">{product.price} ₽</p>
			</div>

			<div className="flex items-center gap-3">
				<button
					onClick={() => handleQuantityChange(quantity - 1)}
					disabled={isLoading || quantity <= 1}
					className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
				>
					−
				</button>
				{isLoading ? (
					<div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
				) : (
					<span className="w-8 text-center">{quantity}</span>
				)}
				<button
					onClick={() => handleQuantityChange(quantity + 1)}
					disabled={isLoading}
					className="px-2 py-1 border rounded cursor-pointer"
				>
					+
				</button>
			</div>

			<div className="w-24 text-right font-semibold">{totalPrice} ₽</div>

			<button
				onClick={handleRemove}
				disabled={isLoading}
				className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
			>
				Удалить
			</button>
		</div>
	);
}
