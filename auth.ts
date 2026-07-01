import NextAuth from 'next-auth';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: { email: {}, password: {} },
			async authorize(credentials) {
				const password = credentials.password as string;
				const user = await prisma.user.findFirst({
					where: { email: credentials.email }
				});
				const isPassValid = user && (await bcrypt.compare(password, user.password));
				if (user && isPassValid) {
					return user;
				}
				return null;
			}
		})
	]
});
