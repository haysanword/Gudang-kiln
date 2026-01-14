import React from 'react';
import { db } from '@/lib/db';
import { materials, warehouses } from '@/db/schema';
import { count } from 'drizzle-orm';
import {
    Package,
    Warehouse,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownLeft,
    TrendingUp,
    History,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/shared';

// Server Component (Async)
export default async function DashboardPage() {
    // Fetch statistics in parallel
    const [
        totalItemsResult,
        totalWarehousesResult,
        allMaterials
    ] = await Promise.all([
        db.select({ value: count() }).from(materials),
        db.select({ value: count() }).from(warehouses),
        db.select().from(materials)
    ]);

    const totalItems = totalItemsResult[0].value;
    const totalWarehouses = totalWarehousesResult[0].value;

    // Calculate specific stats
    const lowStockItems = allMaterials.filter(m => m.currentStock <= m.minStock);
    const totalStock = allMaterials.reduce((acc, m) => acc + m.currentStock, 0);

    const stats = [
        { label: 'Total Item', value: totalItems, icon: Package, color: '#3b82f6', bgColor: 'bg-blue-50' },
        { label: 'Total Lokasi', value: totalWarehouses, icon: Warehouse, color: '#8b5cf6', bgColor: 'bg-purple-50' },
        { label: 'Total Stok', value: totalStock, icon: Activity, color: '#10b981', bgColor: 'bg-emerald-50' },
        { label: 'Stok Kritis', value: lowStockItems.length, icon: AlertTriangle, color: '#f59e0b', bgColor: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Welcome Section */}
            <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Ringkasan Operasional</h2>
                <p className="text-slate-500 font-bold tracking-tight">Pantau status inventaris dan pergerakan stok secara realtime.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-10 group hover:-translate-y-2 transition-all duration-500">
                        <div className="flex items-start justify-between">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{stat.label}</span>
                                <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                            </div>
                            <div className={cn("p-5 rounded-3xl group-hover:rotate-12 transition-transform shadow-sm", stat.bgColor)} style={{ color: stat.color }}>
                                <stat.icon size={28} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Low Stock Watchlist */}
                <Card className="lg:col-span-2 p-12">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">KONTROL STOK KRITIS</h3>
                        </div>
                        <span className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200">
                            {lowStockItems.length} ITEM PERLU PERHATIAN
                        </span>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar -mx-12 px-12">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-slate-50">
                                    <th className="pb-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Informasi Barang</th>
                                    <th className="pb-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stok Saat Ini</th>
                                    <th className="pb-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Analisis</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {lowStockItems.slice(0, 5).map((m) => (
                                    <tr key={m.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xs tracking-tighter shadow-inner group-hover:scale-110 transition-transform">
                                                    {m.code.slice(-3)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-800 text-sm tracking-tight">{m.name}</span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mt-1">{m.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg font-black text-red-600">{m.currentStock}</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase">{m.unit}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 text-center">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-black text-[9px] uppercase tracking-widest">
                                                <AlertTriangle size={12} /> KURANG {m.minStock - m.currentStock}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {lowStockItems.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="py-20 text-center text-slate-400 font-bold tracking-tight">Semua stok dalam keadaan aman.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Recent Activity Mini-List (Placeholder for now) */}
                <Card className="p-10 bg-slate-900 text-white">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-white/10 text-white rounded-2xl backdrop-blur-xl">
                            <History size={20} />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">RIWAYAT TERKINI</h3>
                    </div>

                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse",
                                    i % 2 === 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"
                                )}>
                                    {i % 2 === 0 ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                </div>
                                <div className="flex flex-col justify-center gap-0.5 overflow-hidden">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Transaction #{10024 - i}</span>
                                    </div>
                                    <span className="font-black text-sm tracking-tight truncate">Contoh Log Aktivitas {i + 1}</span>
                                    <span className="text-[10px] font-bold text-slate-500">2 menit yang lalu • Operator 01</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-10 py-5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-3">
                        LIHAT SEMUA RIWAYAT
                    </button>
                </Card>
            </div>
        </div>
    );
}
