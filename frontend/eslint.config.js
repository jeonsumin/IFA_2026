import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineFlatConfig } from 'eslint-define-config'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

// @ts-ignore
export default defineFlatConfig([
  {
    plugins: {
      import: eslintPluginImport,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'import/prefer-default-export': 'off',
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'react/destructuring-assignment': 'off',
      'no-param-reassign': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      'no-throw-literal': 'off',
      'consistent-return': 'off',
      'arrow-body-style': ['warn', 'as-needed'],
      'import/order': 'off'
    },
    ignores: ['node_modules', 'dist', '.eslintrc.cjs', 'vite.config.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'react/require-default-props': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          modifiers: ['destructured'],
          format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },
])
