import { SessionProvider } from 'next-auth/react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'MyShop - лучший магазин',
	description:
		'Широкий ассортимент качественных товаров по низким ценам. Быстрая доставка по всей стране.',
	openGraph: {
		title: 'Всё, что вам нужно — купить с доставкой',
		description: 'Лучшие цены на рынке',
		url: 'https://nextjs-shop-8cgb.vercel.app',
		siteName: 'MyShop'
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<body>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
