import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { pin, role } = await request.json();

        // For super-admin, verify PIN
        if (role === 'super-admin') {
            const { DEFAULT_PIN_HASH } = await import('@/lib/auth');
            const { verifyPin } = await import('@/lib/auth');
            const isValid = await verifyPin(pin, DEFAULT_PIN_HASH);
            if (!isValid) {
                return NextResponse.json(
                    { success: false, message: 'PIN tidak valid' },
                    { status: 401 }
                );
            }
        }

        // Set role cookie (expires in 8 hours)
        const cookieStore = await cookies();
        cookieStore.set('user_role', role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        });

        return NextResponse.json({
            success: true,
            message: 'Login berhasil',
            role
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('user_role');

        return NextResponse.json({
            success: true,
            message: 'Logout berhasil'
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Logout failed' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies();
        const role = cookieStore.get('user_role')?.value || 'staff';

        return NextResponse.json({
            success: true,
            role
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to get session' },
            { status: 500 }
        );
    }
}
