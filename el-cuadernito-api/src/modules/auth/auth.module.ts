/* Routes */
import { authRoutes } from './auth.route';

/* DTOs */

import * as dto from './auth.dto';

/* Service */
import authService from './auth.service';

const authModule = {
	dto,
	service: authService,
	getRoutes: authRoutes,
};

export default authModule;
