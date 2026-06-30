import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts } from '@/app/actions/product';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';

type ProductPageProps = {
	params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		return notFound();
	}

	const relatedProducts = await getRelatedProducts(product.categoryId, product.id);
	return (
		<div className="container mx-auto px-4 py-8">
			{/* Верхняя строка: хлебные крошки слева, корзина справа */}
			<div className="flex justify-between items-center mb-6">
				<nav className="text-sm text-gray-500">
					<Link href="/" className="hover:underline">
						Главная
					</Link>
					<span className="mx-2">/</span>
					<Link href="/products" className="hover:underline">
						Каталог
					</Link>
					<span className="mx-2">/</span>
					<Link
						href={`/products?category=${product.category.name}`}
						className="hover:underline"
					>
						{product.category.name}
					</Link>
					<span className="mx-2">/</span>
					<span className="text-gray-900">{product.name}</span>
				</nav>

				<Link
					href="/cart"
					className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
					aria-label="Перейти в корзину"
				>
					<svg
						className="w-6 h-6 text-gray-700"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					{/* Сюда можно добавить бейдж с количеством товаров */}
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Левая колонка: галерея изображений */}
				<div>
					<ImageGallery images={product.images} name={product.name} />
				</div>

				{/* Правая колонка: информация о товаре */}
				<div>
					<ProductInfo product={product} />
				</div>
			</div>

			{/* Похожие товары */}
			{relatedProducts.length > 0 && (
				<div className="mt-16">
					<h2 className="text-2xl font-bold mb-4">Похожие товары</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
						{relatedProducts.map((related) => (
							<Link
								key={related.id}
								href={`/products/${related.slug}`}
								className="group block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
							>
								<div className="relative aspect-square bg-gray-100">
									<Image
										src={related.images[0] || '/images/placeholder.png'}
										alt={related.name}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="p-3">
									<h3 className="font-medium text-sm truncate">{related.name}</h3>
									<p className="text-sm text-gray-500">{related.category.name}</p>
									<p className="text-lg font-bold text-blue-600 mt-1">
										{related.price} ₽
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
