import React from 'react';
import { db } from '@/lib/db';
import { materials, warehouses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
    Search,
    Plus,
    FileSpreadsheet,
    Edit2,
    Trash2,
    Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, Badge, Button } from '@/components/ui/shared';

// Server Component
export default async function ItemsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; warehouse?: string }>;
}) {
    const { q, warehouse } = await searchParams;

    // Fetch warehouses for filter
    const allWarehouses = await db.select().from(warehouses);

    // Base query with join
    const query = db
        .select({
            id: materials.id,
            code: materials.code,
            name: materials.name,
            unit: materials.unit,
            category: materials.category,
            currentStock: materials.currentStock,
            minStock: materials.minStock,
            warehouseName: warehouses.name,
        })
        .from(materials)
        .leftJoin(warehouses, eq(materials.warehouseId, warehouses.id));

    // Applied filtering logic (in a real app, this would be a more complex drizzle query structure)
    // For now, let's just fetch and filter in JS if search is small or use drizzle conditions if possible
    const materialList = await query;

    const filtered = materialList.filter(m => {
        const matchesSearch = !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.code.toLowerCase().includes(q.toLowerCase());
        const matchesWarehouse = !warehouse || m.warehouseName === warehouse;
        return matchesSearch && matchesWarehouse;
    });

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Inventaris Material</h2>
                    <p className="text-slate-500 font-bold tracking-tight">Kelola master data barang dan monitoring stok di semua lokasi.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none">
                        <FileSpreadsheet size={18} />
                        BULK UPLOAD
                    </Button>
                    <Button className="flex-1 md:flex-none bg-orange-600 hover:bg-orange-700">
                        <Plus size={18} />
                        ITEM BARU
                    </Button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 no-print">
                <form className="md:col-span-2 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                    <input
                        type="text"
                        name="q"
                        defaultValue={q}
                        placeholder="Cari berdasarkan nama atau kode barang..."
                        className="w-full h-16 pl-16 pr-8 bg-white rounded-3xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-sm text-slate-600 shadow-sm shadow-slate-200/50 transition-all"
                    />
                </form>

                <div className="relative group">
                    <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select
                        name="warehouse"
                        defaultValue={warehouse}
                        className="w-full h-16 pl-16 pr-8 bg-white rounded-3xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-sm text-slate-600 shadow-sm shadow-slate-200/50 appearance-none transition-all cursor-pointer"
                    >
                        <option value="">Semua Gudang</option>
                        {allWarehouses.map(w => (
                            <option key={w.id} value={w.name}>{w.name}</option>
                        ))}
                    </select>
                </div>

                <Button type="submit" className="h-16">TERAPKAN FILTER</Button>
            </div>

            {/* Material List Table */}
            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail Material</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lokasi Simpan</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status Stok</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((m) => (
                                <tr key={m.id} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] flex items-center justify-center font-black text-slate-300 text-xs shadow-sm group-hover:scale-110 group-hover:border-orange-100 transition-all">
                                                {m.code.slice(-3)}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-black text-slate-800 tracking-tight text-base group-hover:text-orange-700 transition-colors">{m.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{m.code}</code>
                                                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-black text-slate-700 text-sm tracking-tight">{m.warehouseName || 'Tidak Terdaftar'}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tracking-widest">Internal Warehouse</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className={cn("text-xl font-black tracking-tighter", m.currentStock <= m.minStock ? "text-red-500" : "text-emerald-500")}>
                                                    {m.currentStock}
                                                </span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase">{m.unit}</span>
                                            </div>
                                            {m.currentStock <= m.minStock ? (
                                                <Badge variant="danger" className="text-[8px]">Kritis</Badge>
                                            ) : (
                                                <Badge variant="success" className="text-[8px]">Aman</Badge>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                                            <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center border border-transparent hover:border-blue-100">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center border border-transparent hover:border-red-100">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/50 border border-slate-100 rounded-3xl">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 1 to {filtered.length} of {filtered.length} entries</span>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-12 h-12 p-0" disabled>1</Button>
                </div>
            </div>
        </div>
    );
}
