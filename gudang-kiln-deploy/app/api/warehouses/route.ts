import { db } from '@/lib/db';
import { warehouses } from '@/db/schema';
import { NextResponse } from 'next/server';
import { warehouseSchema } from '@/lib/validations';
import { generateId } from '@/lib/utils';

export async function GET() {
    try {
        const data = await db.select().from(warehouses);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Fetch failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = warehouseSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({ success: false, errors: validated.error.flatten().fieldErrors }, { status: 400 });
        }

        const newWarehouse = {
            id: generateId('WH'),
            ...validated.data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.insert(warehouses).values(newWarehouse);
        return NextResponse.json({ success: true, data: newWarehouse }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
