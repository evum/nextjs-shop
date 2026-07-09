import { SearchParams } from 'next/dist/server/request/search-params';
import LoginForm from './LoginForm';

export default async function LoginPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
	const params = await searchParams;
	return <LoginForm searchParams={params} />;
}
