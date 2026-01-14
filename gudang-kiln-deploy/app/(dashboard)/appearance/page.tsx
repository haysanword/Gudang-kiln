'use client';

import React, { useState } from 'react';
import { Palette, Type, Shield, Save } from 'lucide-react';
import { Card, Button } from '@/components/ui/shared';

export default function AppearancePage() {
    const [primaryColor, setPrimaryColor] = useState('#c2410c');
    const [sidebarColor, setSidebarColor] = useState('#171717');
    const [appName, setAppName] = useState('Gudang Kiln');

    const presets = [
        { name: 'Industrial Orange', primary: '#c2410c', sidebar: '#171717' },
        { name: 'Modern Blue', primary: '#2563eb', sidebar: '#0f172a' },
        { name: 'Forest Green', primary: '#059669', sidebar: '#064e3b' },
        { name: 'Deep Purple', primary: '#7c3aed', sidebar: '#2e1065' },
        { name: 'Midnight Mono', primary: '#4b5563', sidebar: '#000000' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Kustomisasi Workspace</h2>
                <p className="text-slate-500 font-bold tracking-tight">Personalisasi tampilan aplikasi sesuai dengan identitas perusahaan Anda.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                    <Card className="p-10 space-y-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                                <Palette size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">PALET WARNA & IDENTITAS</h3>
                        </div>

                        <div className="space-y-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Aplikasi</label>
                                <div className="relative group">
                                    <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="text"
                                        value={appName}
                                        onChange={(e) => setAppName(e.target.value)}
                                        className="w-full h-16 pl-16 pr-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 outline-none font-bold text-slate-700 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Warna Utama (Brand Color)</label>
                                    <div className="flex items-center gap-4 bg-slate-50 p-2 pr-6 rounded-2xl">
                                        <input
                                            type="color"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="w-14 h-14 bg-transparent border-0 cursor-pointer rounded-xl overflow-hidden"
                                        />
                                        <span className="font-mono font-bold text-slate-500 text-sm uppercase">{primaryColor}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Warna Sidebar (Background)</label>
                                    <div className="flex items-center gap-4 bg-slate-50 p-2 pr-6 rounded-2xl">
                                        <input
                                            type="color"
                                            value={sidebarColor}
                                            onChange={(e) => setSidebarColor(e.target.value)}
                                            className="w-14 h-14 bg-transparent border-0 cursor-pointer rounded-xl overflow-hidden"
                                        />
                                        <span className="font-mono font-bold text-slate-500 text-sm uppercase">{sidebarColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex justify-end">
                            <Button className="h-16 px-10">
                                <Save size={18} /> SIMPAN PERUBAHAN
                            </Button>
                        </div>
                    </Card>

                    <div className="p-10 bg-slate-50 rounded-[3rem] space-y-8">
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-black text-slate-900 tracking-tight">PRESET TEMA CEPAT</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pilih palet yang sudah kami kurasi untuk Anda.</p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {presets.map((p) => (
                                <button
                                    key={p.name}
                                    onClick={() => { setPrimaryColor(p.primary); setSidebarColor(p.sidebar); }}
                                    className="flex flex-col items-center gap-3 group"
                                >
                                    <div className="w-24 h-24 rounded-3xl border-4 border-white shadow-xl overflow-hidden transition-all group-hover:scale-110 active:scale-95 flex flex-col relative">
                                        <div className="flex-1" style={{ backgroundColor: p.sidebar }}></div>
                                        <div className="h-8 w-full" style={{ backgroundColor: p.primary }}></div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">{p.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-2">Live Preview Layout</span>
                        <div className="aspect-[4/5] bg-slate-200 rounded-[3rem] shadow-2xl shadow-slate-300 overflow-hidden relative border-8 border-white">
                            <div className="absolute inset-y-0 left-0 w-1/4" style={{ backgroundColor: sidebarColor }}>
                                <div className="p-4 space-y-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/20"></div>
                                    <div className="space-y-2">
                                        <div className="w-full h-4 rounded-md bg-white/10" style={{ backgroundColor: primaryColor, opacity: 0.6 }}></div>
                                        <div className="w-full h-4 rounded-md bg-white/10"></div>
                                        <div className="w-full h-4 rounded-md bg-white/10"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 w-3/4 bg-slate-50 p-6 space-y-6">
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                    <div className="w-20 h-4 rounded-md bg-slate-100"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-square bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-2">
                                        <div className="w-1/2 h-4 rounded bg-slate-100"></div>
                                        <div className="w-full h-8 rounded bg-slate-50" style={{ backgroundColor: primaryColor, opacity: 0.1 }}></div>
                                    </div>
                                    <div className="aspect-square bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-2">
                                        <div className="w-1/2 h-4 rounded bg-slate-100"></div>
                                        <div className="w-full h-8 rounded bg-slate-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="p-8 bg-blue-600 text-white space-y-6">
                        <Shield className="text-white/40" size={32} />
                        <div className="space-y-4">
                            <h4 className="font-black text-lg tracking-tight">Super Admin Only</h4>
                            <p className="text-white/60 text-xs font-bold leading-relaxed tracking-tight">Hanya user dengan role Super Admin yang dapat menyimpan perubahan visual permanen ke sistem.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
