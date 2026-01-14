import { db } from '@/lib/db';
import { transactions } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const materialId = searchParams.get('materialId');

    try {
        let query = db.select().from(transactions).orderBy(desc(transactions.date));

        if (type) {
            query = query.where(eq(transactions.type, type as any)) as any;
        }
        if (materialId) {
            query = query.where(eq(transactions.materialId, materialId)) as any;
        }

        const data = await query;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Fetch failed' }, { status: 500 });
    }
}
