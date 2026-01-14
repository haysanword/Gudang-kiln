'use server';

import { db } from '@/lib/db';
import { materials, transactions } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { transactionSchema } from '@/lib/validations';
import { generateId } from '@/lib/utils';

export async function createTransactionAction(prevState: any, formData: FormData) {
    const rawData = {
        type: formData.get('type'),
        materialId: formData.get('materialId'),
        warehouseId: formData.get('warehouseId'),
        qty: Number(formData.get('qty')),
        operator: formData.get('operator'),
        section: formData.get('section'),
        purpose: formData.get('purpose'),
        note: formData.get('note'),
    };

    // 1. Validate data
    const validated = transactionSchema.safeParse(rawData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const { type, materialId, qty } = validated.data;

    try {
        // 2. Perform atomic transaction
        await db.transaction(async (tx) => {
            // Check stock for OUT transactions
            if (type === 'OUT') {
                const material = await tx.select().from(materials).where(eq(materials.id, materialId)).limit(1);
                if (!material[0] || material[0].currentStock < qty) {
                    throw new Error('STOK TIDAK CUKUP');
                }
            }

            // Update material stock
            await tx.update(materials)
                .set({
                    currentStock: sql`${materials.currentStock} ${type === 'IN' ? '+' : '-'} ${qty}`,
                    updatedAt: new Date()
                })
                .where(eq(materials.id, materialId));

            // Record transaction
            await tx.insert(transactions).values({
                id: generateId('TRX'),
                date: new Date(),
                ...validated.data
            });
        });

        // 3. Revalidate cache
        revalidatePath('/');
        revalidatePath('/daftar-stok');
        revalidatePath('/laporan');

        return { success: true, message: `Transaksi ${type === 'IN' ? 'Penerimaan' : 'Pengeluaran'} Berhasil!` };
    } catch (error: any) {
        return { success: false, message: error.message || 'Gagal memproses transaksi' };
    }
}
