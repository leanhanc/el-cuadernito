import type { Context, Hono } from 'hono';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

export interface Env {
	Bindings: {
		ALLOWED_ORIGINS: string;
		DATABASE_URL: string;
	};
	Variables: {
		db: NeonHttpDatabase;
		environment: 'development' | 'production';
	};
}

export type App = Hono<Env>;
export type AppContext = Context<Env, '/'>;
