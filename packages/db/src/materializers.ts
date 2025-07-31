import { State } from '@livestore/livestore';

import { tables } from './tables';
import { events } from './events';

const materializers = State.SQLite.materializers(events, {
	'v1.ExpenseCreated': ({
		id,
		amountArs,
		amountUsd,
		exchangeRate,
		currency,
		note,
		categoryId,
		subCategoryId,
		date,
		createdAt,
		userId,
	}) =>
		tables.expenses.insert({
			id,
			amountArs,
			amountUsd,
			exchangeRate,
			currency,
			note,
			categoryId,
			subCategoryId,
			date,
			userId,
			createdAt,
			updatedAt: createdAt,
		}),

	'v1.ExpenseUpdated': ({ id, updatedAt, ...updates }) =>
		tables.expenses
			.update({
				...updates,
				updatedAt,
			})
			.where({ id }),

	'v1.ExpenseDeleted': ({ id }) => tables.expenses.delete().where({ id }),

	'v1.CreateUser': ({ id, isPremium }) =>
		tables.users.insert({
			id,
			isPremium,
		}),
});

export { materializers };
