import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  return Boolean(token);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuth = isAuthenticated(request);

  const authPages = ['/auth/sign-in', '/auth/sign-up'];

  if (isAuth && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const protectedPaths = ['/profile', '/dashboard'];
  if (!isAuth && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/profile/:path*', '/dashboard/:path*'],
};
