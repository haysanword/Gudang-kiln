import { z } from 'zod';

// Material validation schema
export const materialSchema = z.object({
    code: z.string().min(3, 'SKU minimal 3 karakter').max(20),
    name: z.string().min(1, 'Nama barang wajib diisi').max(100),
    unit: z.string().min(1, 'Satuan wajib diisi').max(10),
    minStock: z.number().int().min(0, 'Minimal stok tidak boleh negatif'),
    currentStock: z.number().int().min(0, 'Stok tidak boleh negatif'),
    category: z.enum(['Listrik', 'Mekanik', 'Safety', 'Elektronik', 'Hardware']),
    warehouseId: z.string().min(1, 'Gudang wajib dipilih'),
});

export type MaterialFormData = z.infer<typeof materialSchema>;

// Transaction validation schema
export const transactionSchema = z.object({
    type: z.enum(['IN', 'OUT', 'ADJ']),
    materialId: z.string().min(1, 'Barang wajib dipilih'),
    warehouseId: z.string().min(1, 'Gudang wajib dipilih'),
    qty: z.number().int().positive('Jumlah harus lebih dari 0'),
    operator: z.string().min(1, 'Nama operator wajib diisi'),
    section: z.string().min(1, 'Unit/Departemen wajib diisi'),
    purpose: z.string().min(1, 'Tujuan/Keperluan wajib diisi'),
    note: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

// Warehouse validation schema
export const warehouseSchema = z.object({
    name: z.string().min(1, 'Nama gudang wajib diisi').max(50),
    location: z.string().min(1, 'Lokasi wajib diisi').max(100),
});

export type WarehouseFormData = z.infer<typeof warehouseSchema>;

// App settings validation schema
export const settingsSchema = z.object({
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Format warna tidak valid'),
    sidebarColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Format warna tidak valid'),
    appName: z.string().min(1, 'Nama aplikasi wajib diisi').max(50),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

// Audit reconciliation schema
export const auditSchema = z.object({
    materialId: z.string().min(1),
    physicalQty: z.number().int().min(0, 'Jumlah fisik tidak boleh negatif'),
    remark: z.string().min(1, 'Keterangan audit wajib diisi'),
});

export type AuditFormData = z.infer<typeof auditSchema>;
