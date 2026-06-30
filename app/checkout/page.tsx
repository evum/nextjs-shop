import { redirect } from 'next/navigation';
import { createOrder } from '@/app/actions/order';
import { getCart } from '../actions/cart';

export default async function CheckoutPage() {
	const cartItems = await getCart();

	if (cartItems.length === 0) {
		redirect('/cart');
	}

	const total = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Оформление заказа</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="md:col-span-2">
					<form action={createOrder} className="space-y-4">
						<div>
							<label
								htmlFor="shippingAddress"
								className="block text-sm font-medium mb-1"
							>
								Адрес доставки
							</label>
							<textarea
								id="shippingAddress"
								name="shippingAddress"
								required
								rows={3}
								className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Введите адрес доставки"
							/>
						</div>

						<div>
							<label
								htmlFor="shippingType"
								className="block text-sm font-medium mb-1"
							>
								Способ доставки
							</label>
							<select
								id="shippingType"
								name="shippingType"
								required
								className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="DELIVERY">Курьером</option>
								<option value="PICKUP">Самовывоз</option>
							</select>
						</div>

						<div>
							<label
								htmlFor="paymentMethod"
								className="block text-sm font-medium mb-1"
							>
								Способ оплаты
							</label>
							<select
								id="paymentMethod"
								name="paymentMethod"
								required
								className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="AFTERDELIVERY">Наличными при получении</option>
								<option value="ONLINE">Онлайн-платеж</option>
							</select>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
						>
							Оформить заказ
						</button>
					</form>
				</div>

				{/* Итоговая информация */}
				<div className="md:col-span-1">
					<div className="bg-gray-50 p-4 rounded-lg border">
						<h2 className="text-lg font-semibold mb-4">Ваш заказ</h2>
						<ul className="divide-y divide-gray-200">
							{cartItems.map((item) => (
								<li key={item.id} className="py-2 flex justify-between text-sm">
									<span>
										{item.product.name} × {item.quantity}
									</span>
									<span>{(item.quantity * item.product.price).toFixed(2)} ₽</span>
								</li>
							))}
						</ul>
						<div className="mt-4 pt-4 border-t border-gray-300 flex justify-between font-bold">
							<span>Итого:</span>
							<span>{total.toFixed(2)} ₽</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
