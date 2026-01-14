'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Package,
    PlusCircle,
    MinusCircle,
    ClipboardCheck,
    FileText,
    Palette,
    LogOut,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/' },
    { id: 'stok-masuk', label: 'Penerimaan Stok', icon: PlusCircle, path: '/stok-masuk' },
    { id: 'stok-keluar', label: 'Pengeluaran Stok', icon: MinusCircle, path: '/stok-keluar' },
    { id: 'daftar-stok', label: 'Daftar Barang', icon: Package, path: '/daftar-stok' },
    { id: 'audit', label: 'Audit Stok', icon: ClipboardCheck, path: '/audit' },
    { id: 'laporan', label: 'Laporan Riwayat', icon: FileText, path: '/laporan' },
    { id: 'appearance', label: 'Kustomisasi', icon: Palette, path: '/appearance' },
];

export function Sidebar({ appName, sidebarColor, primaryColor, role }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-8 right-8 z-50 p-5 bg-orange-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                style={{ backgroundColor: primaryColor }}
            >
                <Menu size={24} />
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-[70] w-80 shadow-2xl transition-all duration-500 transform lg:relative lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ backgroundColor: sidebarColor || '#171717' }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="p-10 flex items-center justify-between">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-900/20 group-hover:rotate-12 transition-transform duration-500">
                                <Package className="text-white" size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-black text-lg tracking-tighter leading-none">{appName}</span>
                                <span className="text-slate-500 text-[10px] font-black tracking-widest uppercase mt-1.5 ring-1 ring-slate-800 px-2 py-0.5 rounded-md">Logistics v2</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-6 space-y-2.5 overflow-y-auto no-scrollbar py-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center justify-between px-6 py-4 rounded-3xl group transition-all duration-300",
                                        isActive
                                            ? "bg-gradient-to-r from-slate-800 to-transparent text-white shadow-xl shadow-black/20 translate-x-1"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "p-2.5 rounded-xl transition-all duration-300",
                                            isActive ? "bg-orange-600 text-white ring-4 ring-orange-900/30" : "bg-slate-900 text-slate-500 group-hover:text-slate-300 ring-4 ring-transparent"
                                        )}
                                            style={isActive ? { backgroundColor: primaryColor } : {}}>
                                            <Icon size={18} />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-[0.15em] shrink-0">{item.label}</span>
                                    </div>
                                    {isActive && <ChevronRight size={14} className="text-orange-500 animate-in slide-in-from-left-2 duration-300" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Footer */}
                    <div className="p-8 mt-auto border-t border-slate-800/50">
                        <div className="bg-slate-900/50 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                                    <span className="text-xs font-black text-white">{role?.charAt(0).toUpperCase() || 'S'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{role || 'STAFF'}</span>
                                    <span className="text-white font-black text-sm tracking-tight">Operator 01</span>
                                </div>
                            </div>
                            <LogOut className="text-slate-600 group-hover:text-red-400 transition-colors" size={16} />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
