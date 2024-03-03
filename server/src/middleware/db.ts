import { NeonHttpDatabase, drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

/* Schema */
import schema from '@lib/db/schema';

/* Types */
import { App } from '@lib/types';

export function addDatabaseToContext(app: App): App {
	app.use('*', async (c, next) => {
		const sql = neon(c.env.DATABASE_URL);

		const db: NeonHttpDatabase<typeof schema> = drizzle(sql, {
			logger: c.get('environment') === 'development',
			schema,
		});

		c.set('db', db);

		return await next();
	});

	return app;
}
