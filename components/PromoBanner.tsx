'use client';

import Link from 'next/link';

export default function PromoBanner() {
	return (
		<div className="w-full bg-blue-600 text-white text-center text-sm px-4 py-2">
			Бесплатная доставка при заказе от 3000 ₽ —{' '}
			<Link href="/products" className="underline font-medium hover:text-blue-100">
				в каталог
			</Link>
		</div>
	);
}
