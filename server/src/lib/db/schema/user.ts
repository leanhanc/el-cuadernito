import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

/* Relations */
import { asset } from '@lib/db/schema/asset';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const usersRelations = relations(user, ({ many }) => ({
	assets: many(asset),
}));
