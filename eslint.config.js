import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['node_modules/', 'public/', 'vendor/'] },
    {
        files: ['resources/js/**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            react.configs.flat.recommended,
            react.configs.flat['jsx-runtime'],
            reactHooks.configs.flat.recommended,
            jsxA11y.flatConfigs.recommended,
            prettierRecommended,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        settings: { react: { version: 'detect' } },
        rules: {
            // TypeScript types are used for component props instead.
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                {
                    allowExpressions: true,
                    allowConciseArrowFunctionExpressionsStartingWithVoid: true,
                },
            ],
        },
    }
);
