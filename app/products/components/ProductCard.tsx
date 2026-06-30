import Image from 'next/image';
import Link from 'next/link';
import type { ProductWithCategory } from '@/app/actions/product';

export default function ProductCard({ product }: { product: ProductWithCategory }) {
	console.log(product.images[0]);
	return (
		<Link href={`/products/${product.slug}`} className="group block h-full">
			<div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col bg-white">
				<div className="relative aspect-square w-full bg-gray-100">
					<Image
						src={product.images[0] || '/placeholder.png'}
						alt={product.name}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="p-3 sm:p-4 flex flex-col flex-1">
					<h3 className="font-medium text-sm sm:text-base truncate">{product.name}</h3>
					<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
						{product.category.name}
					</p>
					<p className="text-lg sm:text-xl font-bold mt-2 text-blue-600">
						{product.price} ₽
					</p>
				</div>
			</div>
		</Link>
	);
}
