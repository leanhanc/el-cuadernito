import { Database } from '@lib/types/db';
import type { Context, Hono } from 'hono';

export interface Env {
	Bindings: {
		DATABASE_URL: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		FRONTEND_APP_URL: string;
		TOKEN_SECRET: string;
	};
	Variables: {
		db: Database;
		environment: 'development' | 'production';
	};
}

export type App = Hono<Env>;
export type AppContext = Context<Env, '/'>;
