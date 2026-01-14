import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Only load dotenv if not in a environment that already has the variables (like Vercel)
// or if we explicitly need to load from .env.local for local scripts.
if (process.env.NODE_ENV !== 'production' && !process.env.TURSO_DATABASE_URL) {
    try {
        const { config } = require('dotenv');
        config({ path: '.env.local' });
    } catch (e) {
        // Dotenv might not be available or file missing, which is fine in some environments
    }
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url && process.env.NODE_ENV === 'production') {
    console.warn('Warning: TURSO_DATABASE_URL is not defined in production environment.');
}

// Create Turso client
const turso = createClient({
    url: url || 'libsql://dummy-url', // Fallback for build time if not defined
    authToken: authToken,
});

// Export Drizzle instance
export const db = drizzle(turso);
