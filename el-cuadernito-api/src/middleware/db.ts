import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

/* Types */
import { App } from '@lib/types';

export function addDatabaseToContext(app: App): App {
	app.use('*', async (c, next) => {
		const sql = neon(c.env.DATABASE_URL);

		const db = drizzle(sql, { logger: c.get('environment') === 'development' });

		c.set('db', db);

		return await next();
	});

	return app;
}
