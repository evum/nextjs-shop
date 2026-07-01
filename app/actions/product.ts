'use server';

import { prisma } from '@/lib/prisma';
import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { Category, Product } from '@prisma/client';

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

// Получить товар по slug с категорией
export const getProductBySlug = cache(async (slug: string) => {
	const product = await prisma.product.findUnique({
		where: { slug },
		include: {
			category: true
		}
	});

	if (!product) {
		return null;
	}

	// Преобразуем цену в число (на случай, если в БД хранится как Float)
	return product;
});

// Получить похожие товары (по категории, исключая текущий)
export const getRelatedProducts = cache(async (categoryId: string, productId: string) => {
	const products = await prisma.product.findMany({
		where: {
			categoryId,
			NOT: { id: productId }
		},
		take: 4,
		include: {
			category: true
		}
	});
	return products;
});

export async function getProducts({ category, minPrice, maxPrice, sort, page }: GetProductsProps) {
	const perPage = 10;
	const skip = (page - 1) * perPage;

	const where: Prisma.ProductWhereInput = {};
	category && (where.category = { name: category });
	minPrice && (where.price = { gte: minPrice });
	maxPrice &&
		(where.price = {
			...((where.price as Prisma.FloatFilter<'Product'>) || {}),
			lte: maxPrice
		});

	let orderBy: Prisma.ProductOrderByWithRelationInput = {};
	if (sort === 'price-asc') orderBy = { price: 'asc' };
	else if (sort === 'price-desc') orderBy = { price: 'desc' };
	else if (sort === 'name') orderBy = { name: 'asc' };
	else orderBy = { id: 'asc' };
	1;

	const [products, total] = await prisma.$transaction(async (tx) => {
		const products = await tx.product.findMany({
			where,
			orderBy,
			skip,
			take: perPage,
			include: { category: true }
		});
		const total = await tx.product.count({ where });
		return [products, total];
	});

	return {
		products,
		total,
		page: page || 1,
		perPage
	};
}
