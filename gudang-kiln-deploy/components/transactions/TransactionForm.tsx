'use client';

import React, { useState, useActionState } from 'react';
import {
    PlusCircle,
    MinusCircle,
    User,
    Building2,
    Target,
    FileText,
    AlertCircle,
    CheckCircle2,
    Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, Button } from '@/components/ui/shared';
import { createTransactionAction } from '@/lib/actions';

export function TransactionForm({ type, materials, warehouses, primaryColor }: any) {
    const isIn = type === 'IN';
    const [selectedMatId, setSelectedMatId] = useState('');
    const [qty, setQty] = useState(0);

    const [state, action, isPending] = useActionState(createTransactionAction, null);

    const selectedMat = materials.find((m: any) => m.id === selectedMatId);
    const isQtyInvalid = !isIn && selectedMat && qty > selectedMat.currentStock;

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                    {isIn ? 'Penerimaan Stok Baru' : 'Pengeluaran Stok Barang'}
                </h2>
                <p className="text-slate-500 font-bold tracking-tight">
                    {isIn ? 'Catat pemasukan barang ke dalam gudang dengan akurat.' : 'Catat pemakaian atau pengeluaran barang keluar gudang.'}
                </p>
            </div>

            <Card className="p-12">
                <form action={action} className="space-y-10">
                    <input type="hidden" name="type" value={type} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Warehouse select */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Lokasi Gudang</label>
                            <div className="relative group">
                                <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <select
                                    name="warehouseId"
                                    required
                                    className="w-full h-16 pl-16 pr-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-bold text-sm text-slate-700 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Pilih Gudang...</option>
                                    {warehouses.map((w: any) => (
                                        <option key={w.id} value={w.id}>{w.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Material select */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Pilih Material</label>
                            <div className="relative group">
                                <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <select
                                    name="materialId"
                                    value={selectedMatId}
                                    onChange={(e) => setSelectedMatId(e.target.value)}
                                    required
                                    className="w-full h-16 pl-16 pr-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-bold text-sm text-slate-700 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Pilih Barang...</option>
                                    {materials.map((m: any) => (
                                        <option key={m.id} value={m.id}>[{m.code}] {m.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Material Info Card */}
                    {selectedMat && (
                        <div className={cn(
                            "p-8 rounded-[2rem] border-2 transition-all duration-500 animate-in zoom-in-95",
                            isQtyInvalid ? "bg-red-50 border-red-100" : "bg-slate-900 border-slate-800"
                        )}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center font-black text-white/20">
                                        {selectedMat.code.slice(-3)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-lg tracking-tight leading-tight">{selectedMat.name}</h4>
                                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">{selectedMat.category} • {selectedMat.unit}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Stok Saat Ini</span>
                                        <span className="text-3xl font-black text-white tabular-nums tracking-tighter">{selectedMat.currentStock}</span>
                                    </div>
                                    <div className="w-px h-10 bg-white/10"></div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Min. Aman</span>
                                        <span className="text-3xl font-black text-white/50 tabular-nums tracking-tighter">{selectedMat.minStock}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jumlah</label>
                            <input
                                type="number"
                                name="qty"
                                placeholder="0"
                                required
                                min="1"
                                onChange={(e) => setQty(Number(e.target.value))}
                                className="w-full h-16 px-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-black text-2xl text-slate-800 transition-all shadow-inner"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Operator</label>
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="operator"
                                    required
                                    placeholder="Nama Lengkap..."
                                    className="w-full h-16 pl-16 pr-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-bold text-sm text-slate-700 transition-all shadow-inner"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Unit / Departemen</label>
                            <div className="relative group">
                                <Target className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="section"
                                    required
                                    placeholder="Contoh: Produksi, Maintenance..."
                                    className="w-full h-16 pl-16 pr-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-bold text-sm text-slate-700 transition-all shadow-inner"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tujuan / Keperluan</label>
                            <div className="relative group">
                                <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="purpose"
                                    required
                                    placeholder="Keterangan singkat..."
                                    className="w-full h-16 pl-16 pr-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-bold text-sm text-slate-700 transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catatan Tambahan (Opsional)</label>
                        <textarea
                            name="note"
                            placeholder="Berikan detail tambahan jika diperlukan..."
                            className="w-full h-32 p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-bold text-sm text-slate-700 transition-all shadow-inner resize-none"
                        />
                    </div>

                    {state?.message && (
                        <div className={cn(
                            "p-6 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-2",
                            state.success ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                        )}>
                            {state.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            <span className="font-black text-xs uppercase tracking-widest">{state.message}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isPending || !selectedMatId || isQtyInvalid}
                        className="w-full h-20 text-base"
                        style={{ backgroundColor: isQtyInvalid ? '#ef4444' : primaryColor }}
                    >
                        {isPending ? (
                            <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
                        ) : isQtyInvalid ? (
                            'STOK TIDAK CUKUP'
                        ) : (
                            <>
                                {isIn ? <PlusCircle size={24} /> : <MinusCircle size={24} />}
                                KONFIRMASI {isIn ? 'BARANG MASUK' : 'BARANG KELUAR'}
                            </>
                        )}
                    </Button>
                </form>
            </Card>

            {/* Footer Info */}
            <div className="flex items-center justify-center gap-3 text-slate-400">
                <AlertCircle size={14} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Pastikan data yang diinput sudah benar. Stok akan terupdate otomatis.</p>
            </div>
        </div>
    );
}
