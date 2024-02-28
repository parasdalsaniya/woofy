import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/chat'];

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('auth_session');

  if (!cookie?.value && protectedRoutes.includes(req.nextUrl.pathname)) {
    const url = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  if (cookie?.value && req.nextUrl.pathname === '/') {
    const url = new URL('/chat', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }
}
