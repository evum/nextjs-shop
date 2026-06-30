import NextAuth from 'next-auth';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
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
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.role = token.role;
			return session;
		}
	}
});
