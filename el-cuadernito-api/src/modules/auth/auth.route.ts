import { Hono } from 'hono';

/* Utils */
import { HTTPException } from 'hono/http-exception';
// import { HTTPInternalServerError } from '@lib/utils/response';

/* Validation */
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

/* Service */
import authService from './auth.service';

/* Types */
import { App } from '@lib/types';

export function authRoutes() {
	const auth: App = new Hono();

	auth.post(
		'register',
		zValidator(
			'json',
			z.object({
				email: z
					.string()
					.min(1, 'Please provide an e-mail.')
					.email('Please provide a valid e-mail address.'),
				password: z
					.string()
					.min(6, 'Please provide a password with at least 6 characters.'),
			}),
		),
		async (c) => {
			const db = c.get('db');
			const { email, password } = c.req.valid('json');

			try {
				const newUserId = await authService.signUp({ db, email, password });

				return c.json({ newUserId });
			} catch (error) {
				if (error instanceof HTTPException) {
					return error.getResponse();
				}

				return new HTTPException(500).getResponse();
			}
		},
	);

	return auth;
}
