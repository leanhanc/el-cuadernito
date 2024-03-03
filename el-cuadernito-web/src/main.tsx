import ReactDOM from 'react-dom/client';

/* TanStack*/
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';

/* Material UI */
import { ThemeProvider } from '@mui/material';
import theme from '@/lib/styles/theme';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById('app')!).render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</GoogleOAuthProvider>,
);
