/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const { getDefaultConfig } = require('expo/metro-config');
const { addLiveStoreDevtoolsMiddleware } = require('@livestore/devtools-expo');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, 'node_modules'),
	path.resolve(monorepoRoot, 'node_modules'),
];

// 3. Force Metro to resolve certain packages from the project node_modules
// This helps avoid issues with React Native requiring specific versions
config.resolver.disableHierarchicalLookup = true;

// 4. Add support for additional file extensions if needed
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

// 5. Add Livestore devtools middleware
addLiveStoreDevtoolsMiddleware(config, {
	schemaPath: path.resolve(monorepoRoot, 'packages/db/src/index.ts'),
});

module.exports = config;
