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
		'sign-in/google',
		zValidator(
			'json',
			z.object({
				code: z.string().min(1, 'Please provide your Authorization Code.'),
			}),
		),
		async (c) => {
			const { code } = c.req.valid('json');
			const db = c.get('db');
			const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TOKEN_SECRET } = c.env;

			try {
				const result = await authService.signIn({
					db,
					code,
					googleClientId: GOOGLE_CLIENT_ID,
					googleClientSecret: GOOGLE_CLIENT_SECRET,
					tokenSecret: TOKEN_SECRET,
				});

				return c.json(result);
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
