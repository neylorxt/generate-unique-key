module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    env: {
        node: true,
        es6: true,
        jest: true
    },
    rules: {
        // TypeScript specific rules
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',

        // General rules
        'no-console': 'off',
        'no-debugger': 'error',
        'no-unused-vars': 'off', // Let TypeScript handle this
        'prefer-const': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',
        'template-curly-spacing': 'error',
        'arrow-spacing': 'error',
        'comma-dangle': ['error', 'never'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'indent': ['error', 2],
        'max-len': ['warn', { code: 100 }],
        'no-trailing-spaces': 'error',
        'eol-last': 'error'
    },
    ignorePatterns: [
        'dist/',
        'node_modules/',
        'coverage/',
        '*.js',
        '*.d.ts'
    ]
};