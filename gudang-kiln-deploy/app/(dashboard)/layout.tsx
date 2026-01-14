'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AuthProvider } from '@/lib/auth-context';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [role, setRole] = useState('staff');
    const [settings, setSettings] = useState({
        appName: 'Gudang Kiln',
        primaryColor: '#c2410c',
        sidebarColor: '#171717'
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data.success && data.data) {
                    setSettings(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch settings', err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <AuthProvider>
            <div className="flex h-screen bg-[#f1f5f9] text-slate-800 font-sans overflow-hidden">
                <Sidebar
                    role={role}
                    appName={settings.appName}
                    sidebarColor={settings.sidebarColor}
                    primaryColor={settings.primaryColor}
                />

                <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
                    <Header role={role} onRoleChange={setRole} />

                    <main className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
                        <div className="max-w-[1600px] mx-auto animate-fade-in">
                            {children}
                        </div>
                    </main>
                </div>

                <style jsx global>{`
          :root {
            --color-primary: ${settings.primaryColor};
            --color-sidebar: ${settings.sidebarColor};
          }
        `}</style>
            </div>
        </AuthProvider>
    );
}
