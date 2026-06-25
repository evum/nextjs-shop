import { Category, Product } from '@prisma/client';
import { prisma } from './prisma';

export type ProductWithCategory = Product & {
	category: Category;
};

type GetProductsProps = {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	sort?: 'price-asc' | 'price-desc' | 'name';
	page?: number;
};

export async function getProducts({ category, minPrice, maxPrice, sort, page }: GetProductsProps) {
	const perPage = 1;
	let products: ProductWithCategory[] = await prisma.product.findMany({
		include: { category: true }
	});

	// Фильтрация по категории
	if (category) {
		products = products.filter((p) => p.category.name === category);
	}
	// Фильтрация по цене
	if (minPrice) {
		products = products.filter((p) => p.price >= minPrice);
	}
	if (maxPrice) {
		products = products.filter((p) => p.price <= maxPrice);
	}

	if (sort === 'price-asc') {
		products.sort((a, b) => a.price - b.price);
	} else if (sort === 'price-desc') {
		products.sort((a, b) => b.price - a.price);
	} else if (sort === 'name') {
		products.sort((a, b) => a.name.localeCompare(b.name));
	}

	// Пагинация
	const total = products.length;
	const start = ((page || 1) - 1) * perPage;
	const paginated = products.slice(start, start + perPage);

	return {
		products: paginated,
		total,
		page: page || 1,
		perPage
	};
}
