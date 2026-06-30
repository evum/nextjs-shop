import { ProductWithCategory } from '@/app/actions/product'; // нужен правильный тип
import AddToCartButton from './AddToCartButton';

type ProductInfoProps = {
	product: ProductWithCategory;
};

export default function ProductInfo({ product }: ProductInfoProps) {
	const isInStock = product.stock > 0;

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">{product.name}</h1>
			<div className="flex items-center gap-4">
				<span className="text-2xl font-bold text-blue-600">{product.price} ₽</span>
				{product.oldPrice && (
					<span className="text-lg text-gray-400 line-through">{product.oldPrice} ₽</span>
				)}
			</div>
			<p className="text-gray-600">{product.description}</p>

			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">Категория:</span>
				<span className="text-sm text-gray-600">{product.category.name}</span>
			</div>

			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">Наличие:</span>
				{isInStock ? (
					<span className="text-sm text-green-600 font-medium">
						В наличии ({product.stock} шт.)
					</span>
				) : (
					<span className="text-sm text-red-600 font-medium">Нет в наличии</span>
				)}
			</div>

			<div className="pt-4 border-t">
				<AddToCartButton productId={product.id} disabled={!isInStock} />
			</div>
		</div>
	);
}
