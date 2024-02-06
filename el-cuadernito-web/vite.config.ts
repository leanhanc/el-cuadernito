import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.relative(__dirname, './src/pages'),
		},
	},
	plugins: [
		react(),
		TanStackRouterVite({
			routesDirectory: './src/pages',
			quoteStyle: 'single',
		}),
	],
});
