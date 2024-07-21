import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		viteReact({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		TanStackRouterVite(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				display: 'standalone',
				display_override: ['window-controls-overlay'],
				name: 'el-cuadernito',
				short_name: 'el-cuadernito',
				description: 'Local-First Personal Finance App',
				theme_color: '#DF4601',
				icons: [
					{
						src: 'icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},

			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: true,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
			'@components': path.resolve(__dirname, './src/components'),
			'@lib': path.resolve(__dirname, './src/lib'),
		},
	},
});
