module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Dùng parser cho TypeScript
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended', // Hỗ trợ TypeScript
        'prettier',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'import/prefer-default-export': 0,
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-nested-ternary': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': ['error', { allowTernary: true }],
        'react/self-closing-comp': 1,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/prop-types': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-no-comment-textnodes': 0,
        'react/jsx-props-no-spreading': 0,
        'react/no-array-index-key': 0,
        'react/no-unescaped-entities': 0,
        'react/require-default-props': 0,
        'react/react-in-jsx-scope': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'linebreak-style': 'off',
        semi: ['error', 'never'],
    },
}
