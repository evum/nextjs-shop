'use server';

import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const getCategories = cache(
	async () =>
		await prisma.category.findMany({
			orderBy: { name: 'asc' }
		})
);
