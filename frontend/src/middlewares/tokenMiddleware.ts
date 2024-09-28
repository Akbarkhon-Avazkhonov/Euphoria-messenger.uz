import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function tokenMiddleware(request: NextRequest) {
  // Get the role from cookies
  const role = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;


  // Redirect to the main page if trying to access /admin without the correct role
  if (pathname.startsWith('/admin') && (!role || role !== 'Админ')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Default behavior: continue to the requested page
  return NextResponse.next();
}

// Apply middleware to specific paths (adjust as needed)
export const config = {
  matcher: ['/admin/:path*', '/:path*'],
};
