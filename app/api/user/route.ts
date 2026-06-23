import { NextRequest, NextResponse } from 'next/server';

// GET /api/user
export async function GET(request: NextRequest) {
	const url = request.nextUrl;
	const searchParams = url.searchParams;
	const email = searchParams.get('email');
	const pass = searchParams.get('pass');
	if (!email || !pass) {
		return NextResponse.json({ data: null });
	}
	return NextResponse.json({ data: {email, password: pass} });

}
