module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier',
	],
	ignorePatterns: ['.eslintrc.cjs', 'dist', 'app.example.tsx'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
	},
	rules: {
		'consistent-return': 'warn',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'no-console': 'error',
		'no-param-reassign': [
			'error',
			{ props: true, ignorePropertyModificationsForRegex: ['^state'] },
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
	},
};
