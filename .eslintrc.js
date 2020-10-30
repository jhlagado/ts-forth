module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    indent: ["error", 4],
    rules: {
        '@typescript-eslint/no-unused-vars': [1, { args: 'all', argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 0,
    },
};
