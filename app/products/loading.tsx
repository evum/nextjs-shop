const ProductsLoading = () => (
	<div className="container mx-auto px-4 py-8">
		<h1 className="text-2xl font-bold mb-6">Каталог товаров</h1>
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className="border border-gray-400 rounded-lg p-4 animate-pulse">
					<div className="bg-gray-200 h-48 w-full rounded-md"></div>
					<div className="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
					<div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
					<div className="mt-2 h-6 bg-gray-200 rounded w-1/3"></div>
				</div>
			))}
		</div>
	</div>
);

export default ProductsLoading;
