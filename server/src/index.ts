import { Hono } from 'hono';

/* Middleware */
import {
	addDatabaseToContext,
	addLoggerMiddleware,
	addSecurityMiddleware,
} from './middleware';

/* Types */
import { App } from '@lib/types';

/* Modules */
import authModule from './modules/auth';

/* Hono App */
const app: App = new Hono();

/* Middleware */
addSecurityMiddleware(app);
addLoggerMiddleware(app);
addDatabaseToContext(app);

/* Routes */
app.route('/auth', authModule.getRoutes());

export default app;
