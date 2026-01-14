import React from 'react';
import { db } from '@/lib/db';
import { transactions, materials } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import {
    ArrowUpRight,
    ArrowDownLeft,
    Download,
    Calendar,
    Filter,
    Search
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Card, Button } from '@/components/ui/shared';

export default async function LaporanPage() {
    const allTransactions = await db.select({
        id: transactions.id,
        date: transactions.date,
        type: transactions.type,
        qty: transactions.qty,
        operator: transactions.operator,
        section: transactions.section,
        purpose: transactions.purpose,
        materialName: materials.name,
        materialUnit: materials.unit,
    })
        .from(transactions)
        .leftJoin(materials, eq(transactions.materialId, materials.id))
        .orderBy(desc(transactions.date))
        .limit(100);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Riwayat Transaksi</h2>
                    <p className="text-slate-500 font-bold tracking-tight">Audit trail lengkap untuk setiap pergerakan barang di gudang.</p>
                </div>
                <Button className="bg-slate-900 hover:bg-black">
                    <Download size={18} /> EXPORT EXCEL (CSV)
                </Button>
            </div>

            {/* Filters Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 no-print">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Cari ID transaksi, operator, atau tujuan..."
                        className="w-full h-16 pl-16 pr-8 bg-white rounded-3xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-sm text-slate-600 shadow-sm transition-all"
                    />
                </div>
                <div className="relative group">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select className="w-full h-16 pl-16 pr-8 bg-white rounded-3xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-sm text-slate-600 shadow-sm appearance-none cursor-pointer">
                        <option value="">Semua Waktu</option>
                        <option value="today">Hari Ini</option>
                        <option value="week">Minggu Ini</option>
                        <option value="month">Bulan Ini</option>
                    </select>
                </div>
                <div className="relative group">
                    <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select className="w-full h-16 pl-16 pr-8 bg-white rounded-3xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-sm text-slate-600 shadow-sm appearance-none cursor-pointer">
                        <option value="">Semua Tipe</option>
                        <option value="IN">Masuk</option>
                        <option value="OUT">Keluar</option>
                    </select>
                </div>
            </div>

            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Waktu & Kode</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tipe</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail Item</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Jumlah</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator & Tujuan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {allTransactions.map((t) => (
                                <tr key={t.id} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-black text-slate-800 text-sm tracking-tight">
                                                {t.date ? format(new Date(t.date), "dd MMM yyyy, HH:mm", { locale: id }) : '-'}
                                            </span>
                                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex justify-center">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center ring-4 ring-transparent group-hover:ring-offset-2 transition-all",
                                                t.type === 'IN' ? "bg-emerald-50 text-emerald-600 ring-emerald-100" : "bg-orange-50 text-orange-600 ring-orange-100"
                                            )}>
                                                {t.type === 'IN' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1 text-slate-700 font-bold text-sm tracking-tight capitalize">
                                            {t.materialName || 'Unknown Item'}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={cn(
                                            "text-lg font-black tabular-nums tracking-tighter",
                                            t.type === 'IN' ? "text-emerald-600" : "text-orange-600"
                                        )}>
                                            {t.type === 'IN' ? '+' : '-'}{t.qty}
                                        </span>
                                        <span className="text-[10px] font-black text-slate-300 uppercase ml-2">{t.materialUnit}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-black text-slate-700 text-[11px] uppercase tracking-wider">{t.operator}</span>
                                            <span className="text-[10px] font-bold text-slate-400 truncate max-w-[200px]">{t.section} • {t.purpose}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {allTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-slate-400 font-bold tracking-tight">Belum ada riwayat transaksi.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
