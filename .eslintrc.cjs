module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'next',
    'next/core-web-vitals',
  ],
  ignorePatterns: ['dist', 'coverage', '.eslintrc.cjs', '.next'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/extensions': ['.ts', 'tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', 'tsx'],
    },
  },
  plugins: ['react', 'react-refresh', 'react-compiler', 'import'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'react/self-closing-comp': 'warn',
    'react-compiler/react-compiler': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'react-refresh/only-export-components': 'off',
  },
};
