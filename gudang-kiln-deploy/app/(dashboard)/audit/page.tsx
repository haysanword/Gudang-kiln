import React from 'react';
import { db } from '@/lib/db';
import { materials, warehouses } from '@/db/schema';
import { AuditList } from '@/components/audit/AuditList';

export default async function AuditPage() {
    const [allMaterials, allWarehouses] = await Promise.all([
        db.select().from(materials),
        db.select().from(warehouses)
    ]);

    return <AuditList materials={allMaterials} warehouses={allWarehouses} />;
}
