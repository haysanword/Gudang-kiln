import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple session management without external dependencies
export function middleware(request: NextRequest) {
    const role = request.cookies.get('user_role')?.value || 'staff';
    const pathname = request.nextUrl.pathname;

    // Public routes (no auth needed)
    const publicRoutes = ['/login', '/api/settings'];
    if (publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Protected routes by role
    const superAdminOnlyRoutes = ['/appearance'];
    const adminRoutes = ['/audit', '/laporan'];

    if (superAdminOnlyRoutes.some(route => pathname.startsWith(route))) {
        if (role !== 'super-admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (role === 'staff') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
