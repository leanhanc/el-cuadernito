import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	typography: {
		fontFamily: 'Inter, sans-serif',
		h1: {
			fontFamily: 'EB Garamond',
			fontWeight: 700,
		},
		h2: {
			fontFamily: 'EB Garamond',
			fontWeight: 700,
		},
	},
	palette: {
		mode: 'dark',
		background: {
			default: '#0a0e11',
			paper: '#0a0e11',
		},
		primary: {
			main: '#213948',
		},
		text: {
			primary: '#FAFAFA',
			secondary: '#DADADA',
		},
		secondary: {
			main: '#9b8407',
		},
		success: {
			main: '#009B72',
		},
		error: {
			main: '#C3423F',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					minHeight: '48px',
				},
			},
		},
	},
});

export default theme;
