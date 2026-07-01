export const runtime = 'nodejs';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export default auth((req) => {
	const { pathname } = req.nextUrl;
	const session = req.auth;
	const sessionId = req.cookies.get('sessionId')?.value;
	const response = NextResponse.next();

	if (!sessionId) {
		response.cookies.set('sessionId', randomUUID(), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 30 // 30 дней
		});
		return response;
	}
	// if (pathname.startsWith('/checkout') && !session?.user) {
	// 	return NextResponse.redirect(new URL('/', req.url));
	// }
	return response;
});
export const config = {
	matcher: ['/login', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};
