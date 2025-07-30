import eslint from '@eslint/js';
import { configs } from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import expoConfig from 'eslint-config-expo/flat.js';

export default [
	// Base ignores
	{
		ignores: [
			'build/',
			'dist/',
			'node_modules/',
			'.expo/**',
			'metro.config.js',
			'**/*.d.ts',
		],
	},

	// Base recommended rules
	eslint.configs.recommended,
	prettierConfig,

	...configs.strictTypeChecked,

	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: [
					'./tsconfig.json',
					'./apps/*/tsconfig.json',
					'./packages/*/tsconfig.json',
				],
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				Bun: 'readonly',
				NodeJS: 'readonly',
			},
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/prefer-nullish-coalescing': 'error',

			'consistent-return': 'warn',
			'no-await-in-loop': 'warn',
			'no-console': 'warn',
			'no-duplicate-imports': 'error',
		},
	},

	{
		files: ['apps/mobile/**/*.{js,ts,jsx,tsx}'],
		...expoConfig[0],
	},

	{
		files: ['**/*.js'],
		...configs.disableTypeChecked,
	},
	{
		files: ['**/logger.ts'],
		rules: {
			'no-console': 'off',
		},
	},
];
