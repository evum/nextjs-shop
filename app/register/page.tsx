import { SearchParams } from 'next/dist/server/request/search-params';
import RegisterForm from './RegisterForm';

export default async function RegisterPage({
	searchParams
}: {
	searchParams: Promise<SearchParams>;
}) {
	const params = await searchParams;
	return <RegisterForm searchParams={params} />;
}
