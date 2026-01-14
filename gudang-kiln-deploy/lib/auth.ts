import bcrypt from 'bcryptjs';

/**
 * Hash a PIN using bcrypt
 */
export async function hashPin(pin: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pin, salt);
}

/**
 * Verify PIN against hash
 */
export async function verifyPin(pin: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pin, hash);
}

/**
 * Default Super Admin PIN (for demo purposes)
 * In production, this should be stored in database
 */
export const DEFAULT_SUPER_ADMIN_PIN = '1234';

/**
 * Pre-hashed PIN for 1234 (for quick verification)
 * Generated with: bcrypt.hash('1234', 10)
 */
export const DEFAULT_PIN_HASH = '$2a$10$rXN5LFvFKqGvKnVpLXvJLOjvYjQN8GQqKJWzqLxgLUxaB5ZgBnO1.';
