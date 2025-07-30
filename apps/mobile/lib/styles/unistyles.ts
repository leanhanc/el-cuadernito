/* eslint-disable @typescript-eslint/no-empty-object-type */
import { StyleSheet } from 'react-native-unistyles';

// Define your light theme
const lightTheme = {
	colors: {
		primary: '#007AFF',
		secondary: '#5856D6',
		background: '#FFFFFF',
		surface: '#F2F2F7',
		text: '#000000',
		textSecondary: '#6D6D70',
		border: '#C6C6C8',
		success: '#34C759',
		warning: '#FF9500',
		error: '#FF3B30',
		tint: '#0a7ea4',
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: '#0a7ea4',
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		xxl: 48,
	},
	typography: {
		fontSize: {
			xs: 12,
			sm: 14,
			md: 16,
			lg: 18,
			xl: 20,
			xxl: 24,
			xxxl: 32,
		},
		fontWeight: {
			light: '300' as const,
			regular: '400' as const,
			medium: '500' as const,
			semibold: '600' as const,
			bold: '700' as const,
		},
	},
	borderRadius: {
		sm: 4,
		md: 8,
		lg: 12,
		xl: 16,
		round: 9999,
	},
	shadows: {
		sm: {
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 2,
			elevation: 2,
		},
		md: {
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.15,
			shadowRadius: 4,
			elevation: 4,
		},
		lg: {
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.2,
			shadowRadius: 8,
			elevation: 8,
		},
	},
	// Helper functions
	gap: (multiplier: number) => multiplier * 8,
};

// You can define additional themes if needed
const darkTheme = {
	colors: {
		...lightTheme.colors,
		primary: '#0A84FF',
		background: '#000000',
		surface: '#1C1C1E',
		text: '#FFFFFF',
		textSecondary: '#8E8E93',
		border: '#38383A',
		tint: '#fff',
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: '#fff',
	},
};

// Define breakpoints for responsive design
const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
} as const;

// TypeScript type definitions
type AppBreakpoints = typeof breakpoints;
type AppThemes = {
	light: typeof lightTheme;
};

declare module 'react-native-unistyles' {
	export interface UnistylesBreakpoints extends AppBreakpoints {}
	export interface UnistylesThemes extends AppThemes {}
}

// Configure Unistyles
StyleSheet.configure({
	themes: {
		light: lightTheme,
	},
	breakpoints,
	settings: {
		initialTheme: 'light',
		adaptiveThemes: false,
	},
});

export { lightTheme, darkTheme, breakpoints };
