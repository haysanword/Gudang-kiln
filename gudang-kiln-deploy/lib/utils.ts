import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Generate random ID for entities
 */
export function generateId(prefix?: string): string {
    const random = Math.random().toString(36).substring(2, 8);
    return prefix ? `${prefix}-${random}` : random;
}

/**
 * Format date to localized string
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('id-ID', options);
}

/**
 * Format time to localized string
 */
export function formatTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Format datetime to localized string
 */
export function formatDateTime(date: Date | string): string {
    return `${formatDate(date)} ${formatTime(date)}`;
}
