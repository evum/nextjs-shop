'use client';

import { getCategories } from '@/app/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Filters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
	const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
	const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories().then((result) => setCategories(result));
	}, []);

	const applyFilters = () => {
		const params = new URLSearchParams();
		if (selectedCategory) params.set('category', selectedCategory);
		if (minPrice) params.set('minPrice', minPrice);
		if (maxPrice) params.set('maxPrice', maxPrice);
		const sort = searchParams.get('sort');
		if (sort) params.set('sort', sort);
		params.set('page', '1');
		router.push(`/products?${params}`);
		setIsOpen(false);
	};

	const resetFilters = () => {
		setSelectedCategory('');
		setMinPrice('');
		setMaxPrice('');
		const sort = searchParams.get('sort');
		if (sort) {
			router.push(`/products?sort=${sort}`);
		}
		setIsOpen(false);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-100">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50 transition"
			>
				<span>Фильтры</span>
				<svg
					className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			<div className={`p-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
				<h2 className="hidden md:block font-semibold text-lg mb-4">Фильтры</h2>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-1 text-gray-700">
						Категория
					</label>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
					>
						<option value="">Все</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-1 text-gray-700">Цена</label>
					<div className="flex gap-2">
						<input
							type="number"
							placeholder="от"
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.value)}
							className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="number"
							placeholder="до"
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
							className="w-1/2 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-2">
					<button
						onClick={applyFilters}
						className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm cursor-pointer"
					>
						Применить
					</button>
					<button
						onClick={resetFilters}
						className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition text-sm cursor-pointer"
					>
						Сбросить
					</button>
				</div>
			</div>
		</div>
	);
}
