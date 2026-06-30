import { getOrder } from '@/app/actions/order';
import { Order } from '@prisma/client';

type OrderWithError = Order & {
	error?: string;
};

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	let order: OrderWithError;
	try {
		order = await getOrder(id);
	} catch (e) {
		console.error(e);
	}

	return order ? (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Заказ #{order.id.slice(0, 8)}</h1>
			<p className="text-sm text-gray-600">Статус: {order.status}</p>
			<p className="text-sm text-gray-600">Сумма: {order.total.toFixed(2)} ₽</p>
		</div>
	) : (
		<div>Заказ не найден</div>
	);
}
