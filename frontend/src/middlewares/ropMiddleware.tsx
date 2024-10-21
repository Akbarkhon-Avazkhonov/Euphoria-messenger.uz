import { middlewareAccess } from '@/utils/access';
import { NextResponse, type NextRequest } from 'next/server';

export async function ropMiddleware(request: NextRequest) {
    const url = new URL(request.url);

    ;
    if (request.cookies.has('access')) {

        const accessValue = request.cookies.get('access')?.value || '';
        const CanManageUser = await middlewareAccess('can_manage_users', accessValue);
        if (CanManageUser) {
            // Use an absolute URL for the redirect
            return NextResponse.redirect(new URL('/rop', request.url));
        }
        return NextResponse.next();
    } 
}

export const config = {
    matcher: "/",
};
