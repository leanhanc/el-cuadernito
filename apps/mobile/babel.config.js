/* eslint-disable no-undef */
module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			[
				'babel-preset-expo',
				{
					unstable_transformImportMeta: true,
				},
			],
		],
		plugins: [
			[
				'react-native-unistyles/plugin',
				{
					// pass root folder of your application
					// all files under this folder will be processed by the Babel plugin
					// if you need to include more folders, or customize discovery process
					// check available babel options
					root: './',
				},
			],
			'babel-plugin-transform-vite-meta-env',
			'@babel/plugin-syntax-import-attributes',
		],
	};
};
