'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [error, setError] = useState('');

	if (status === 'loading') return <div>Loading...</div>;
	if (session) {
		router.push('/dashboard');
		return null;
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		await signIn('credentials', {
			email,
			password,
			redirect: false
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name="email" type="email" placeholder="Email" required />
			<input name="password" type="password" placeholder="Password" required />
			<button type="submit">Sign In</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	);
}
