'use client';

import React, { useState } from 'react';
import {
    ClipboardCheck,
    Search,
    Filter,
    CheckCircle2,
    AlertCircle,
    ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, Badge, Button } from '@/components/ui/shared';

export function AuditList({ materials, warehouses }: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterWarehouse, setFilterWarehouse] = useState('');
    const [physicalCounts, setPhysicalCounts] = useState<Record<string, number>>({});

    const filtered = materials.filter((m: any) => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesWarehouse = !filterWarehouse || m.warehouseId === filterWarehouse;
        return matchesSearch && matchesWarehouse;
    });

    const handleAdjust = async (id: string) => {
        const pQty = physicalCounts[id];
        if (pQty === undefined || pQty === null) return alert('Masukkan jumlah fisik!');

        // In a real app, this would call a Server Action
        if (confirm('Konfirmasi rekonsiliasi stok?')) {
            console.log(`Adjusting item ${id} to ${pQty}`);
            // Trigger reconciliation action here
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Stock Audit & Rekonsiliasi</h2>
                <p className="text-slate-500 font-bold tracking-tight">Samakan jumlah stok sistem dengan perhitungan fisik di lapangan.</p>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500" size={18} />
                    <input
                        type="text"
                        placeholder="Cari barang atau kode..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-16 pl-16 pr-8 bg-white rounded-3xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-sm text-slate-600 shadow-sm"
                    />
                </div>
                <div className="relative group">
                    <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select
                        onChange={(e) => setFilterWarehouse(e.target.value)}
                        className="w-full h-16 pl-16 pr-8 bg-white rounded-3xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-sm text-slate-600 shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="">Semua Lokasi</option>
                        {warehouses.map((w: any) => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Material</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Stok Sistem</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-48">Jumlah Fisik</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Selisih</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((m: any) => {
                                const diff = (physicalCounts[m.id] !== undefined) ? physicalCounts[m.id] - m.currentStock : 0;

                                return (
                                    <tr key={m.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-800 text-sm tracking-tight">{m.name}</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{m.code}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-center font-black text-slate-600 tabular-nums">
                                            {m.currentStock} {m.unit}
                                        </td>
                                        <td className="px-10 py-8">
                                            <input
                                                type="number"
                                                placeholder="--"
                                                value={physicalCounts[m.id] ?? ''}
                                                onChange={(e) => setPhysicalCounts({ ...physicalCounts, [m.id]: Number(e.target.value) })}
                                                className="w-full p-4 bg-slate-50 rounded-2xl text-center font-black border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all"
                                            />
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            {physicalCounts[m.id] !== undefined && (
                                                <span className={cn(
                                                    "px-4 py-2 rounded-xl text-[10px] font-black tabular-nums",
                                                    diff > 0 ? "bg-emerald-50 text-emerald-600" : diff < 0 ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-400"
                                                )}>
                                                    {diff > 0 ? `+${diff}` : diff}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <Button
                                                variant={physicalCounts[m.id] !== undefined ? 'primary' : 'ghost'}
                                                disabled={physicalCounts[m.id] === undefined}
                                                onClick={() => handleAdjust(m.id)}
                                                className="h-12 px-5"
                                            >
                                                <ArrowRightLeft size={16} /> ADJUST
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
