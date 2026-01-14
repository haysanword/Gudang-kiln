import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Warehouses Table
export const warehouses = sqliteTable('warehouses', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    location: text('location').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
});

// Materials Table
export const materials = sqliteTable('materials', {
    id: text('id').primaryKey(),
    code: text('code').notNull().unique(),
    name: text('name').notNull(),
    unit: text('unit').notNull(),
    minStock: integer('min_stock').notNull().default(0),
    currentStock: integer('current_stock').notNull().default(0),
    category: text('category').notNull(),
    warehouseId: text('warehouse_id')
        .notNull()
        .references(() => warehouses.id),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
});

// Transactions Table
export const transactions = sqliteTable('transactions', {
    id: text('id').primaryKey(),
    type: text('type').notNull(), // 'IN' | 'OUT' | 'ADJ'
    materialId: text('material_id')
        .notNull()
        .references(() => materials.id),
    warehouseId: text('warehouse_id')
        .notNull()
        .references(() => warehouses.id),
    qty: integer('qty').notNull(),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    operator: text('operator').notNull(),
    section: text('section').notNull(),
    purpose: text('purpose').notNull(),
    note: text('note'),
});

// Users Table (for future auth)
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    role: text('role').notNull(), // 'admin' | 'staff' | 'super-admin'
    pinHash: text('pin_hash'),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
});

// App Settings Table
export const appSettings = sqliteTable('app_settings', {
    id: text('id').primaryKey(),
    primaryColor: text('primary_color').notNull().default('#c2410c'),
    sidebarColor: text('sidebar_color').notNull().default('#171717'),
    appName: text('app_name').notNull().default('Gudang Kiln'),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
});

// Type exports for TypeScript
export type Warehouse = typeof warehouses.$inferSelect;
export type NewWarehouse = typeof warehouses.$inferInsert;

export type Material = typeof materials.$inferSelect;
export type NewMaterial = typeof materials.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type AppSettings = typeof appSettings.$inferSelect;
export type NewAppSettings = typeof appSettings.$inferInsert;
