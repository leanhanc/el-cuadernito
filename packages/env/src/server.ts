/* eslint-disable no-console */
import { config } from 'dotenv';
import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { z } from 'zod';

import { serverSchema, type ServerEnv } from './schemas';

function findProjectRoot(): string {
	const currentDir = process.cwd();
	const possibleRoots = [
		currentDir,
		resolve(currentDir, '..', '..'),
		resolve(currentDir, '..', '..', '..'),
	];

	for (const root of possibleRoots) {
		const envPath = join(root, `.env.${process.env.NODE_ENV ?? 'development'}`);
		if (existsSync(envPath)) {
			return root;
		}
	}

	return currentDir;
}

function loadServerEnv(): ServerEnv {
	const currentEnv = process.env.NODE_ENV ?? 'development';

	// In production environment variables are injected directly
	if (currentEnv === 'production') {
		const parsed = serverSchema.safeParse(process.env);
		if (!parsed.success) {
			console.error(
				'❌ Invalid environment variables:',
				z.treeifyError(parsed.error),
			);
			process.exit(1);
		}
		return parsed.data;
	}

	// In development, load from .env file
	const projectRoot = findProjectRoot();
	const envPath = join(projectRoot, `.env.${currentEnv}`);

	if (!existsSync(envPath)) {
		console.error(`❌ Environment file not found at: ${envPath}`);
		console.error('Please check the environment schema for required variables');
		process.exit(1);
	}

	// Load environment variables using dotenv
	const result = config({ path: envPath });
	if (result.error) {
		console.error('❌ Failed to load environment file:', result.error);
		process.exit(1);
	}

	const parsed = serverSchema.safeParse(process.env);

	if (!parsed.success) {
		console.error(
			'❌ Invalid environment variables:',
			z.treeifyError(parsed.error),
		);
		process.exit(1);
	}

	return parsed.data;
}

const env = loadServerEnv();

export default env;
