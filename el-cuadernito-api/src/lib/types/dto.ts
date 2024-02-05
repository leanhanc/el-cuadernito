import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

interface Database {
	db: NeonHttpDatabase<Record<string, never>>;
}

export type BaseDto = Database & Record<string, unknown>;
