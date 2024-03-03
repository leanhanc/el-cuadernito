/* Routes */
import { authRoutes } from './auth.route';

/* Service */
import authService from './auth.service';

const authModule = {
	service: authService,
	getRoutes: authRoutes,
};

export default authModule;
