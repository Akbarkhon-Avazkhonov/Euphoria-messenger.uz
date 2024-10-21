import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Import individual middleware functions
import { tokenMiddleware } from './middlewares/tokenMiddleware';
import { ropMiddleware } from './middlewares/ropMiddleware';

export async function middleware(request: NextRequest) {
  // Await the response from tokenMiddleware
  const tokenResponse = await tokenMiddleware(request);
  if (tokenResponse) return tokenResponse;

  
  // Uncomment and handle ropMiddleware similarly if needed
  // const ropResponse = await ropMiddleware(request);
  // console.log('ropResponse:', ropResponse);
  // if (ropResponse) return ropResponse;

  // Default: Continue with the request if no middleware returned a response
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/:path*'], // Adjust the matcher as needed
};
