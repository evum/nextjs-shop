import Link from 'next/link';

export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
			<div className="max-w-3xl text-center">
				<h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4">
					Добро пожаловать в <span className="text-blue-600">MyStore</span>
				</h1>
				<p className="text-lg md:text-xl text-gray-700 mb-8">
					Лучшие товары по лучшим ценам. Начните покупки прямо сейчас!
				</p>
				<Link
					href="/products"
					className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
				>
					Перейти в каталог
				</Link>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
					<div className="bg-white p-6 rounded-xl shadow-md">
						<div className="text-3xl mb-2">🚀</div>
						<h3 className="font-semibold text-gray-800">Быстрая доставка</h3>
						<p className="text-sm text-gray-600">По всей стране</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-md">
						<div className="text-3xl mb-2">🛡️</div>
						<h3 className="font-semibold text-gray-800">Гарантия качества</h3>
						<p className="text-sm text-gray-600">Все товары проверены</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-md">
						<div className="text-3xl mb-2">💳</div>
						<h3 className="font-semibold text-gray-800">Безопасная оплата</h3>
						<p className="text-sm text-gray-600">Защита ваших данных</p>
					</div>
				</div>
			</div>
		</div>
	);
}
