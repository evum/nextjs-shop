import { ProductWithCategory } from '@/app/actions/product';
import ProductCard from './ProductCard';

export default function ProductList({ products }: { products: ProductWithCategory[] }) {
	if (products.length === 0) {
		return (
			<p className="text-center py-12 text-gray-500 text-sm sm:text-base">
				Товаров не найдено
			</p>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
