// import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
	const sessionId = req.cookies.get('sessionId')?.value;
	const response = NextResponse.next();

	if (!sessionId) {
		response.cookies.set('sessionId', crypto.randomUUID(), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});
	}

	return response;
}

export const config = {
	matcher: ['/login', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
	runtime: 'nodejs'
};
