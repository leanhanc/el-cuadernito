import { config } from 'dotenv';

//drizzle.config.ts
import type { Config } from 'drizzle-kit';

config({ path: '.dev.vars' });

export default {
	schema: './src/lib/db/schema/*',
	out: './src/lib/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL ?? '',
	},
	verbose: true,
} satisfies Config;
