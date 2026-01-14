import { db } from '@/lib/db';
import { materials } from '@/db/schema';
import { eq, or, like } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { materialSchema } from '@/lib/validations';
import { generateId } from '@/lib/utils';

// GET all materials or search
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const warehouseId = searchParams.get('warehouseId');

    try {
        let query = db.select().from(materials);

        if (q) {
            query = query.where(
                or(
                    like(materials.name, `%${q}%`),
                    like(materials.code, `%${q}%`)
                )
            ) as any;
        }

        if (warehouseId) {
            query = query.where(eq(materials.warehouseId, warehouseId)) as any;
        }

        const data = await query;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch materials' }, { status: 500 });
    }
}

// POST create material
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = materialSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({
                success: false,
                errors: validated.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const newMaterial = {
            id: generateId('MAT'),
            ...validated.data,
            currentStock: 0, // Initial stock is always 0, changed via transactions
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.insert(materials).values(newMaterial);
        return NextResponse.json({ success: true, data: newMaterial }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
