'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const getVisiblePages = (currentPage: number, totalPages: number): (string | number)[] => {
	const delta = 1;
	const range = [];
	const rangeWithDots = [];
	let prevNum: number;

	for (let i = 1; i <= totalPages; i++) {
		if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
			range.push(i);
		}
	}

	range.forEach((i) => {
		if (prevNum) {
			if (i - prevNum === 2) {
				rangeWithDots.push(prevNum + 1);
			} else if (i - prevNum !== 1) {
				rangeWithDots.push('...');
			}
		}
		rangeWithDots.push(i);
		prevNum = i;
	});
	return rangeWithDots;
};

export default function Pagination({ totalPages }: { totalPages: number }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentPage = useMemo(() => {
		const page = searchParams.get('page');
		const parsedPage = Number.parseInt(page);
		return !isNaN(parsedPage) ? parsedPage : 1;
	}, [searchParams]);

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', `${page}`);
		router.push(`/products?${params}`);
	};

	const pages = useMemo(
		() => getVisiblePages(currentPage, totalPages),
		[currentPage, totalPages]
	);

	return (
		<nav className="flex justify-center items-center gap-1 mt-8">
			<button
				onClick={() => goToPage(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer"
			>
				←
			</button>

			{pages.map((page, idx) =>
				page === '...' ? (
					<span key={`dots-${idx}`} className="px-2 text-gray-400">
						…
					</span>
				) : (
					<button
						key={page}
						onClick={() => goToPage(page as number)}
						className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm border rounded-md transition cursor-pointer ${
							page === currentPage
								? 'bg-blue-600 text-white border-blue-600'
								: 'hover:bg-gray-50'
						}`}
					>
						{page}
					</button>
				)
			)}

			<button
				onClick={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer"
			>
				→
			</button>
		</nav>
	);
}
