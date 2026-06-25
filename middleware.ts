export const runtime = 'nodejs';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
	const { pathname } = req.nextUrl;
	const session = req.auth;
	if (pathname === '/login') return NextResponse.next();
	if (pathname.startsWith('/admin') && session?.user?.role !== 'ADMIN') {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}
	return NextResponse.next();
});
export const config = {
	matcher: ['/admin/:path*', '/login']
};
