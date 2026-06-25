// app/products/page.tsx
import { getProducts } from '@/lib/products';
import ProductList from './components/ProductList';
import Filters from './components/Filters';
import SortSelect from './components/SortSelect';
import Pagination from './components/Pagination';

type SearchParams = {
	category?: string;
	minPrice?: string;
	maxPrice?: string;
	sort?: string;
	page?: string;
};

type ProductPageProps = {
	searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: ProductPageProps) {
	const params = await searchParams;

	const page = parseInt(params.page || '1', 10);
	const category = params.category;
	const minPrice = params.minPrice ? parseFloat(params.minPrice) : null;
	const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : null;
	const sort =
		params.sort == 'price-asc' || params.sort == 'price-desc' || params.sort == 'name'
			? params.sort
			: null;

	const { products, total, perPage } = await getProducts({
		category,
		minPrice,
		maxPrice,
		sort,
		page
	});

	const totalPages = Math.ceil(total / perPage);

	return (
		<div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
			<h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Каталог товаров</h1>

			<div className="flex flex-col md:flex-row gap-4 md:gap-6">
				<aside className="w-full md:w-64 lg:w-72 shrink-0">
					<Filters />
				</aside>

				{/* Основная область */}
				<main className="flex-1 min-w-0">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
						<span className="text-sm text-gray-600">
							Найдено: <span className="font-medium">{total}</span> товаров
						</span>
						<SortSelect currentSort={sort || undefined} />
					</div>

					<ProductList products={products} />
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"></div>

					{totalPages > 1 && <Pagination totalPages={totalPages} />}
				</main>
			</div>
		</div>
	);
}
