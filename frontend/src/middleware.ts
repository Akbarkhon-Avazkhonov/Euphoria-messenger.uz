// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Import individual middleware functions
import { tokenMiddleware } from './middlewares/tokenMiddleware';


export function middleware(request: NextRequest) {
  // Execute tokenMiddleware and check if it returns a response
  const tokenResponse = tokenMiddleware(request);
  if (tokenResponse) return tokenResponse;


  // Default: Continue with the request if no middleware returned a response
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/:path*'], // Adjust the matcher as needed
};
