import PWABadge from './components/PWABadge';

/* Fonts */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* MUI */
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@lib/styles/theme.ts';

/* Translations */
import { LanguageProvider } from '@lib/context/translations';

/* TanStack Router */
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const router = createRouter({ routeTree });

export default function ElCuadernitoApp() {
	return (
		<LanguageProvider>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
				<CssBaseline />
				<PWABadge />
			</ThemeProvider>
		</LanguageProvider>
	);
}
