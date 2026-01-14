'use client';

import React, { useState } from 'react';
import {
    Bell,
    Search,
    Calendar,
    Cloud,
    ChevronDown,
    Lock,
    LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useAuth } from '@/lib/auth-context';

export function Header({ role, onRoleChange }: any) {
    const { role: authRole, login, logout } = useAuth();
    const [showPinModal, setShowPinModal] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const currentDate = format(new Date(), "EEEE, d MMMM yyyy", { locale: id });

    const handleSuperAdminLogin = async () => {
        const success = await login(pin, 'super-admin');
        if (success) {
            setShowPinModal(false);
            setPin('');
            setError('');
            onRoleChange('super-admin');
        } else {
            setError('PIN salah!');
        }
    };

    const handleLogout = async () => {
        await logout();
        onRoleChange('staff');
    };

    return (
        <>
            <header className="h-40 px-12 flex items-center justify-between border-b border-slate-200/50 bg-white/50 backdrop-blur-xl sticky top-0 z-40">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-slate-400">
                        <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
                            <Cloud size={14} />
                        </div>
                        <span className="text-[10px] font-black tracking-widest uppercase">System Operational</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-slate-300" />
                        <h1 className="text-2xl font-black text-slate-900 tracking-tighter">{currentDate}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="w-80 h-14 pl-16 pr-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-bold text-sm text-slate-600 transition-all shadow-inner"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative w-14 h-14 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-200 transition-all group">
                            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>

                        <div className="h-10 w-px bg-slate-200 mx-2"></div>

                        <div className="relative group">
                            <button className="flex items-center gap-4 bg-white border-2 border-slate-100 p-2 pr-6 rounded-2xl hover:border-slate-200 transition-all shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-500 text-xs shadow-inner">
                                    {role?.charAt(0).toUpperCase() || 'S'}
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase">{role || 'STAFF'}</span>
                                    <span className="text-[11px] font-black text-slate-700 tracking-tight flex items-center gap-2">
                                        Operator Mode <ChevronDown size={12} className="text-slate-300" />
                                    </span>
                                </div>
                            </button>

                            {/* Auth Actions Menu */}
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                                {authRole !== 'super-admin' && (
                                    <button
                                        onClick={() => setShowPinModal(true)}
                                        className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 hover:bg-slate-50 transition-colors border-b border-slate-50 flex items-center gap-3"
                                    >
                                        <Lock size={14} /> Super Admin Login
                                    </button>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                >
                                    <LogOut size={14} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* PIN Modal */}
            {showPinModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300" onClick={() => setShowPinModal(false)}>
                    <div className="bg-white rounded-[3rem] p-12 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin Access</h3>
                                    <p className="text-sm text-slate-500 font-bold">Masukkan PIN untuk lanjut</p>
                                </div>
                            </div>

                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => { setPin(e.target.value); setError(''); }}
                                placeholder="Masukkan PIN..."
                                className="w-full h-16 px-8 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500/20 outline-none font-black text-2xl text-slate-800 tracking-widest text-center transition-all"
                                onKeyPress={(e) => e.key === 'Enter' && handleSuperAdminLogin()}
                            />

                            {error && (
                                <p className="text-sm font-black text-red-600 text-center animate-in slide-in-from-bottom-2">{error}</p>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={() => { setShowPinModal(false); setPin(''); setError(''); }}
                                    className="flex-1 h-14 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSuperAdminLogin}
                                    className="flex-1 h-14 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
