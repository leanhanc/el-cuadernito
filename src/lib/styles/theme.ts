import type { LinkProps, ListItemButtonProps } from '@mui/material';
import { createTheme } from '@mui/material';
import { Link } from '@tanstack/react-router';

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				img: { display: 'block' },
			},
		},
		MuiLink: {
			defaultProps: {
				component: Link,
			} as LinkProps & { to: string },
		},
		MuiButton: {
			styleOverrides: {
				root: {
					minHeight: '44px',
				},
			},
		},
		MuiListItemButton: {
			defaultProps: {
				LinkComponent: Link,
			} as Partial<ListItemButtonProps> & { to?: string },
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					width: 444,
				},
			},
		},
	},
	palette: { mode: 'dark', primary: { main: '#DF4601' } },
});

export default theme;
