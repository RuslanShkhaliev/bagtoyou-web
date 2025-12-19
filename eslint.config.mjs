import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		'node_modules/**',
	]),

	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			react,
			'react-hooks': reactHooks,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/self-closing-comp': [
				'error',
				{ component: true, html: true },
			],
			'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
			'react/display-name': 'off',
			'react/no-unescaped-entities': 'off',

			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'off',
		},
		settings: {
			react: { version: 'detect' },
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},

	prettier,
]);

export default eslintConfig;
