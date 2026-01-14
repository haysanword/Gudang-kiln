// Common types for the application
export type Role = 'admin' | 'staff' | 'super-admin';
export type Page = 'dashboard' | 'in' | 'out' | 'items' | 'audit' | 'reports' | 'appearance';
export type TransactionType = 'IN' | 'OUT' | 'ADJ';

export interface AppTheme {
    primaryColor: string;
    sidebarColor: string;
    appName: string;
}

// Re-export database types
export type {
    Warehouse,
    NewWarehouse,
    Material,
    NewMaterial,
    Transaction,
    NewTransaction,
    User,
    NewUser,
    AppSettings,
    NewAppSettings,
} from '@/db/schema';
