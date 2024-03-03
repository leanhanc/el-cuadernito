import { config } from 'dotenv';
import postgres from 'postgres';

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

config({ path: '.dev.vars' });

const databaseUrl = drizzle(
	postgres(`${process.env.DATABASE_URL}`, { max: 1 }),
);

const main = async () => {
	try {
		await migrate(databaseUrl, { migrationsFolder: './migrations' });
		// eslint-disable-next-line no-console
		console.log('Migration complete ✅');
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Migration error: ', error);
	}
	process.exit(0);
};
void main();
