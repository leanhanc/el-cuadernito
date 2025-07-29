import { z } from 'zod';

/* Base schema */
export const baseSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	LOG_LEVEL: z
		.enum(['fatal', 'trace', 'debug', 'info', 'warn', 'error'])
		.default('info'),
});

export const serverSchema = baseSchema.extend({

});

/* Types */
export type BaseEnv = z.infer<typeof baseSchema>;
export type ServerEnv = z.infer<typeof serverSchema>;
