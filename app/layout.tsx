import { SessionProvider } from 'next-auth/react';
import { Metadata } from 'next';
import SentryFeatureFlags from '@/components/SentryFeatureFlags';
import PromoBanner from '@/components/PromoBanner';
import { getFeatureFlags } from '@/lib/feature-flags';
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
	const flags = getFeatureFlags();

	return (
		<html lang="ru">
			<body>
				<SentryFeatureFlags flags={flags} />
				{flags['promo-banner'] ? <PromoBanner /> : null}
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
