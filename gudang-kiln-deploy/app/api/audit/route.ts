import { db } from '@/lib/db';
import { materials } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Stock Reconciliation API
export async function POST(request: Request) {
    try {
        const { materialId, physicalCount } = await request.json();

        if (!materialId || typeof physicalCount !== 'number') {
            return NextResponse.json(
                { success: false, message: 'Invalid input' },
                { status: 400 }
            );
        }

        // Update stock to match physical count
        await db.update(materials)
            .set({
                currentStock: physicalCount,
                updatedAt: new Date()
            })
            .where(eq(materials.id, materialId));

        return NextResponse.json({
            success: true,
            message: 'Stock reconciled successfully'
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || 'Reconciliation failed' },
            { status: 500 }
        );
    }
}

// Get audit summary
export async function GET() {
    try {
        const allMaterials = await db.select().from(materials);

        const summary = {
            totalItems: allMaterials.length,
            lowStockItems: allMaterials.filter(m => m.currentStock <= m.minStock).length,
            totalValue: allMaterials.reduce((acc, m) => acc + m.currentStock, 0),
            lastUpdated: new Date().toISOString()
        };

        return NextResponse.json({ success: true, data: summary });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to generate audit summary' },
            { status: 500 }
        );
    }
}
