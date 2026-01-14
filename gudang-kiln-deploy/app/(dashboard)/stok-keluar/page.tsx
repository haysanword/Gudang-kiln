import React from 'react';
import { db } from '@/lib/db';
import { materials, warehouses } from '@/db/schema';
import { TransactionForm } from '@/components/transactions/TransactionForm';

export default async function StokKeluarPage() {
    const [allMaterials, allWarehouses] = await Promise.all([
        db.select().from(materials),
        db.select().from(warehouses)
    ]);

    return <TransactionForm type="OUT" materials={allMaterials} warehouses={allWarehouses} primaryColor="#c2410c" />;
}
