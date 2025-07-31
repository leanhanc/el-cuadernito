import { State } from '@livestore/livestore';

import { tables } from './schema';
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

	'v1.ExpenseDeleted': ({ id, deletedAt }) =>
		tables.expenses.update({ deletedAt }).where({ id }),
});

export { materializers };
