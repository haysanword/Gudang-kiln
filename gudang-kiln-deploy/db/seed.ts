import 'dotenv/config';
import { db } from '../lib/db';
import { warehouses, materials, appSettings } from './schema';

async function seed() {
    console.log('🌱 Starting database seeding...');

    try {
        // Seed warehouses
        console.log('Creating warehouses...');
        await db.insert(warehouses).values([
            { id: 'W01', name: 'Gudang Utama A', location: 'Blok Barat' },
            { id: 'W02', name: 'Gudang Sparepart B', location: 'Blok Timur' },
            { id: 'W03', name: 'Gudang Transit C', location: 'Lantai 2' },
        ]);
        console.log('✅ Created 3 warehouses');

        // Seed materials (40 items matching existing app)
        console.log('Creating materials...');
        const materialData = [];
        const categories = ['Listrik', 'Mekanik', 'Safety', 'Elektronik', 'Hardware'];
        const units = ['PCS', 'UNIT', 'SET', 'BOX'];
        const warehouseIds = ['W01', 'W02', 'W03'];

        for (let i = 1; i <= 40; i++) {
            materialData.push({
                id: i.toString(),
                code: `SKU-${1000 + i}`,
                name: `Komponen ${categories[i % 5]} Gen-${i}`,
                unit: units[i % 4],
                minStock: 10 + (i % 5),
                currentStock: 15 + ((i * 2) % 30),
                category: categories[i % 5],
                warehouseId: warehouseIds[i % 3],
            });
        }

        await db.insert(materials).values(materialData);
        console.log('✅ Created 40 materials');

        // Seed default app settings
        console.log('Creating app settings...');
        await db.insert(appSettings).values({
            id: 'default',
            primaryColor: '#c2410c',
            sidebarColor: '#171717',
            appName: 'Gudang Kiln',
        });
        console.log('✅ Created app settings');

        console.log('');
        console.log('✅ Database seeding completed successfully!');
        console.log('');
        console.log('Summary:');
        console.log('  - 3 warehouses');
        console.log('  - 40 materials');
        console.log('  - Default app settings');
        console.log('');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

seed();
