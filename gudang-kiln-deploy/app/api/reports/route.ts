import { db } from '@/lib/db';
import { transactions, materials } from '@/db/schema';
import { desc, eq, gte, lte, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    try {
        let query = db
            .select({
                id: transactions.id,
                date: transactions.date,
                type: transactions.type,
                qty: transactions.qty,
                operator: transactions.operator,
                section: transactions.section,
                purpose: transactions.purpose,
                materialName: materials.name,
                materialCode: materials.code,
                materialUnit: materials.unit,
            })
            .from(transactions)
            .leftJoin(materials, eq(transactions.materialId, materials.id))
            .orderBy(desc(transactions.date));

        // Apply filters
        const conditions = [];
        if (startDate) conditions.push(gte(transactions.date, new Date(startDate)));
        if (endDate) conditions.push(lte(transactions.date, new Date(endDate)));
        if (type) conditions.push(eq(transactions.type, type as any));

        if (conditions.length > 0) {
            query = query.where(and(...conditions)) as any;
        }

        const data = await query;

        // Calculate summary statistics
        const summary = {
            totalTransactions: data.length,
            totalIn: data.filter(t => t.type === 'IN').reduce((acc, t) => acc + t.qty, 0),
            totalOut: data.filter(t => t.type === 'OUT').reduce((acc, t) => acc + t.qty, 0),
        };

        return NextResponse.json({ success: true, data, summary });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to generate report' },
            { status: 500 }
        );
    }
}
