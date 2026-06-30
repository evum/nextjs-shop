'use server';

import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export default cache(
	async () =>
		await prisma.category.findMany({
			orderBy: { name: 'asc' }
		})
);
