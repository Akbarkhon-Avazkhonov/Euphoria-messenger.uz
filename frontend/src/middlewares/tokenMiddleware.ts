import { NextResponse, type NextRequest } from 'next/server';

export function tokenMiddleware(request: NextRequest) {
    const url = new URL(request.url);

    if (request.cookies.has('token')) {
        const role = request.cookies.get('role')?.value;
        if (role === 'Админ') {
            // Use an absolute URL for the redirect
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    } 
}

export const config = {
    matcher: "/",
};
