'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect({ currentSort }: { currentSort: string }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sort = e.target.value;
		const params = new URLSearchParams(searchParams);
		sort ? params.set('sort', sort) : params.delete('sort');

		params.set('page', '1');
		router.push(`/products?${params}`);
	};

	return (
		<select
			value={currentSort}
			onChange={handleSortChange}
			className="w-full sm:w-auto border rounded-md px-3 py-1.5 sm:py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
		>
			<option value="">По умолчанию</option>
			<option value="price-asc">Цена ↑</option>
			<option value="price-desc">Цена ↓</option>
			<option value="name">По названию</option>
		</select>
	);
}
