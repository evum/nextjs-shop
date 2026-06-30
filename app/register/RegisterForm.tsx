'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '../actions/register';
import { SearchParams } from 'next/dist/server/request/search-params';

export default function RegisterForm({ searchParams }: { searchParams: SearchParams }) {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const result = await register(name, email, password);

			if (result.error) {
				throw new Error(result.error);
			}

			alert(
				'Вы успешно зарегистрированы и будете перенаправлены на страницу логина, чтобы войти в свой аккаунт'
			);

			router.push(`/login?${searchParams}`);
		} catch (err: unknown) {
			setError((err as Error).message || 'Произошла ошибка');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
			<div className="max-w-md w-full space-y-8">
				<h2 className="text-center text-3xl font-bold">Регистрация</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="Имя"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full px-3 py-2 border rounded"
						disabled={isLoading}
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border rounded"
						disabled={isLoading}
					/>
					<input
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border rounded"
						disabled={isLoading}
					/>
					{error && <div className="text-red-600 text-sm">{error}</div>}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
					>
						{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
					</button>
				</form>
				<p className="text-center text-sm">
					Уже есть аккаунт?{' '}
					<Link href="/login" className="text-blue-600 hover:underline">
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
}
