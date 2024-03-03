/* TanStack */
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/* Fonts */
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/eb-garamond/500.css';
import '@fontsource/eb-garamond/700.css';

/* Material UI */
import { CssBaseline } from '@mui/material';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Outlet />
			<CssBaseline />
			<ReactQueryDevtools buttonPosition="top-right" />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
