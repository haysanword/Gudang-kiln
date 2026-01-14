import { db } from '@/lib/db';
import { appSettings } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const settings = await db.select().from(appSettings).limit(1);
        if (settings.length > 0) {
            return NextResponse.json({ success: true, data: settings[0] });
        }
        return NextResponse.json({ success: false, message: 'Settings not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
