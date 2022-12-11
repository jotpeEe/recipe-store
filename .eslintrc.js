module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'prettier', '@next/next'],
    rules: {
        'prettier/prettier': 'error',
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
                typedefs: true,
            },
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        // next web-vitals
        '@next/next/no-html-link-for-pages': 'error',
        '@next/next/no-sync-scripts': 'error',
        // next
        // warnings
        '@next/next/google-font-display': 'warn',
        '@next/next/google-font-preconnect': 'warn',
        '@next/next/next-script-for-ga': 'warn',
        '@next/next/no-before-interactive-script-outside-document': 'warn',
        '@next/next/no-css-tags': 'warn',
        '@next/next/no-head-element': 'warn',
        '@next/next/no-img-element': 'warn',
        '@next/next/no-page-custom-font': 'warn',
        '@next/next/no-styled-jsx-in-document': 'warn',
        '@next/next/no-title-in-document-head': 'warn',
        '@next/next/no-typos': 'warn',
        '@next/next/no-unwanted-polyfillio': 'warn',
        // errors
        '@next/next/inline-script-id': 'error',
        '@next/next/no-assign-module-variable': 'error',
        '@next/next/no-document-import-in-page': 'error',
        '@next/next/no-duplicate-head': 'error',
        '@next/next/no-head-import-in-document': 'error',
        '@next/next/no-script-component-in-head': 'error',
    },
};
