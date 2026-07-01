export const runtime = 'nodejs';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const sessionId = req.cookies.get('sessionId')?.value;
	const response = NextResponse.next();

	if (!sessionId) {
		response.cookies.set('sessionId', crypto.randomUUID(), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 30 // 30 дней
		});
		return response;
	}
	return response;
});
export const config = {
	matcher: ['/login', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};
