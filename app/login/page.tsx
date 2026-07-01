import { SearchParams } from 'next/dist/server/request/search-params';
import LoginForm from './LoginForm';

export default function LoginPage({ searchParams }: { searchParams: SearchParams }) {
	return <LoginForm searchParams={searchParams} />;
}
