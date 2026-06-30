import { SearchParams } from 'next/dist/server/request/search-params';
import RegisterForm from './RegisterForm';

export default function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
	return <RegisterForm searchParams={searchParams} />;
}
