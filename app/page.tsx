import { signIn } from '@/auth';
// import { prisma } from '@/lib/prisma';

export default function Page() {
	async function create(formData: FormData) {
		'use server';
		signIn('credentials', { email: `${formData.get('comment')}` });
	}

	return (
		<form action={create}>
			<input type="text" placeholder="write a comment" name="comment" />
			<button type="submit">Submit</button>
		</form>
	);
}
