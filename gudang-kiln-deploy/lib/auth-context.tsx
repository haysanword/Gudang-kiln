'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'staff' | 'admin' | 'super-admin';

interface AuthContextType {
    role: Role;
    setRole: (role: Role) => void;
    login: (pin: string, role: Role) => Promise<boolean>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [role, setRoleState] = useState<Role>('staff');
    const [isLoading, setIsLoading] = useState(true);

    // Check session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('/api/auth');
                const data = await res.json();
                if (data.success) {
                    setRoleState(data.role);
                }
            } catch (error) {
                console.error('Session check failed', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async (pin: string, targetRole: Role): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin, role: targetRole }),
            });
            const data = await res.json();

            if (data.success) {
                setRoleState(data.role);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth', { method: 'DELETE' });
            setRoleState('staff');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const setRole = (newRole: Role) => {
        setRoleState(newRole);
    };

    return (
        <AuthContext.Provider value={{ role, setRole, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
