module.exports = {
	root: true,
	env: {
		node: true,
		es2020: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
	],
	plugins: ['react-refresh', 'react-hooks'],
	ignorePatterns: ['*.config.ts', '.eslintrc.cjs', 'dist', 'migrate.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: true,
	},
	rules: {
		'consistent-return': 'warn',
		'no-console': 'error',
		'no-unused-vars': 'off',
		'no-await-in-loop': 'error',
		'@typescript-eslint/no-misused-promises': [
			2,
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/jsx-filename-extension': 'off',
		'react/jsx-no-bind': 'off',
		'react/jsx-sort-props': [
			1,
			{
				callbacksLast: true,
				shorthandFirst: false,
				noSortAlphabetically: false,
				reservedFirst: true,
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
