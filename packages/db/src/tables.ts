import { State, Schema } from '@livestore/livestore';

export const tables = {
	users: State.SQLite.table({
		name: 'users',
		columns: {
			id: State.SQLite.text({ primaryKey: true, nullable: false }),
			isPremium: State.SQLite.boolean({ nullable: false, default: false }),
		},
	}),

	expenses: State.SQLite.table({
		name: 'expenses',
		columns: {
			id: State.SQLite.text({ primaryKey: true, nullable: false }),
			amountArs: State.SQLite.real({ nullable: false }),
			amountUsd: State.SQLite.real({ nullable: false }),
			exchangeRate: State.SQLite.real({ nullable: false }),
			currency: State.SQLite.text({
				nullable: false,
				schema: Schema.Literal('ARS', 'USD'),
			}),
			note: State.SQLite.text({ nullable: true }),
			categoryId: State.SQLite.text({ nullable: true }),
			subCategoryId: State.SQLite.text({ nullable: true }),
			date: State.SQLite.integer({
				nullable: false,
				schema: Schema.DateFromNumber,
			}),
			userId: State.SQLite.text({ nullable: false }),
			createdAt: State.SQLite.integer({
				nullable: false,
				schema: Schema.DateFromNumber,
			}),
			updatedAt: State.SQLite.integer({
				nullable: false,
				schema: Schema.DateFromNumber,
			}),
		},
	}),
};
