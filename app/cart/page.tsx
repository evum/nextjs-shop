import { getCart } from '@/app/actions/cart';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

export default async function CartPage() {
	const itemsInCart = await getCart();

	if (!itemsInCart || itemsInCart.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-2xl font-bold mb-6">Корзина</h1>
				<p className="text-gray-500 text-center py-12">Ваша корзина пуста</p>
			</div>
		);
	}

	const totalItems = itemsInCart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = itemsInCart.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Корзина</h1>
			<div className="flex flex-col lg:flex-row gap-8">
				<div className="flex-1">
					{itemsInCart.map((item) => (
						<CartItem
							key={item.id}
							id={item.id}
							product={item.product}
							quantity={item.quantity}
						/>
					))}
				</div>
				<div className="lg:w-72 shrink-0">
					<CartSummary totalItems={totalItems} totalPrice={totalPrice} />
				</div>
			</div>
		</div>
	);
}
