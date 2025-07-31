import { Events, Schema } from '@livestore/livestore';

export const events = {
	expenseCreated: Events.synced({
		name: 'v1.ExpenseCreated',
		schema: Schema.Struct({
			id: Schema.String,
			amountArs: Schema.Number,
			amountUsd: Schema.Number,
			exchangeRate: Schema.Number,
			currency: Schema.Literal('ARS', 'USD'),
			note: Schema.optional(Schema.String),
			categoryId: Schema.optional(Schema.String),
			subCategoryId: Schema.optional(Schema.String),
			userId: Schema.String,
			date: Schema.Date,
			createdAt: Schema.Date,
		}),
	}),

	expenseUpdated: Events.synced({
		name: 'v1.ExpenseUpdated',
		schema: Schema.Struct({
			id: Schema.String,
			updatedAt: Schema.Date,
			amountArs: Schema.optional(Schema.Number),
			amountUsd: Schema.optional(Schema.Number),
			exchangeRate: Schema.optional(Schema.Number),
			currency: Schema.optional(Schema.Literal('ARS', 'USD')),
			note: Schema.optional(Schema.String),
			categoryId: Schema.optional(Schema.String),
			subCategoryId: Schema.optional(Schema.String),
			date: Schema.optional(Schema.Date),
		}),
	}),

	expenseDeleted: Events.synced({
		name: 'v1.ExpenseDeleted',
		schema: Schema.Struct({
			id: Schema.String,
		}),
	}),

	createUser: Events.synced({
		name: 'v1.CreateUser',
		schema: Schema.Struct({
			id: Schema.String,
			isPremium: Schema.Boolean,
		}),
	}),
};
