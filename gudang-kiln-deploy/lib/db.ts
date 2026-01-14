import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Create Turso client
const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Export Drizzle instance
export const db = drizzle(turso);
