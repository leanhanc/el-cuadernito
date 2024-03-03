import { relations } from 'drizzle-orm';
import {
	pgTable,
	serial,
	doublePrecision,
	pgEnum,
	varchar,
	integer,
	timestamp,
} from 'drizzle-orm/pg-core';

/* Relations */
import { user } from '@lib/db/schema/user';
export const assetTypeEnum = pgEnum('asset_type', [
	'account',
	'cash',
	'investment',
	'other',
]);

export const asset = pgTable('assets', {
	id: serial('id').primaryKey(),
	amount: doublePrecision('amount').notNull(),
	assetType: assetTypeEnum('asset_type').notNull(),
	bank: varchar('bank', { length: 100 }),
	userId: integer('user_id')
		.references(() => user.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const assetRelation = relations(asset, ({ one }) => ({
	user: one(user, {
		fields: [asset.userId],
		references: [user.id],
	}),
}));
