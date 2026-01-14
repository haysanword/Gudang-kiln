import { db } from '@/lib/db';
import { materials } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { materialSchema } from '@/lib/validations';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const data = await db.select().from(materials).where(eq(materials.id, id)).limit(1);
        if (data.length === 0) {
            return NextResponse.json({ success: false, message: 'Material not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: data[0] });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const validated = materialSchema.partial().safeParse(body);

        if (!validated.success) {
            return NextResponse.json({ success: false, errors: validated.error.flatten().fieldErrors }, { status: 400 });
        }

        await db.update(materials)
            .set({ ...validated.data, updatedAt: new Date() })
            .where(eq(materials.id, id));

        return NextResponse.json({ success: true, message: 'Material updated' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await db.delete(materials).where(eq(materials.id, id));
        return NextResponse.json({ success: true, message: 'Material deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
