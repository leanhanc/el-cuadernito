import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

/* Types */
import { App } from '@lib/types/env';

export function addLoggerMiddleware(app: App): App {
	app.use('*', logger());
	app.use('*', prettyJSON());

	return app;
}
