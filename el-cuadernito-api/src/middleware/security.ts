import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { RateLimiterMemory } from 'rate-limiter-flexible';

/* Types */
import { App } from '@lib/types/env';

const rateLimiter = new RateLimiterMemory({
	points: 10,
	duration: 100,
	blockDuration: 60,
});

export function addSecurityMiddleware(app: App): App {
	/* Rate Limiting */
	app.use('*', async (c, next) => {
		const ip = c.req.raw.headers.get('CF-Connecting-IP');
		if (!ip) {
			return next();
		}
		try {
			await rateLimiter.consume(ip);
		} catch (e) {
			return c.text('Too many requests', 429);
		}
		return await next();
	});

	/* CORS */
	app.use('*', async (c, next) => {
		const corsMiddleware = cors({
			origin: '',
			allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
			allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
		});
		return await corsMiddleware(c, next);
	});

	/* Secure Headers */
	app.use('*', secureHeaders());

	return app;
}
