import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'src/dataValidation/generated'] },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: {
      'import-x': importPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y-x': jsxA11y,
    },
    settings: {
      // Use the resolver's flat-config API so import-x follows the TypeScript project configuration.
      'import-x/resolver-next': [createTypeScriptImportResolver()],
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.flatConfigs.recommended.rules,
      ...reactRefresh.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'prefer-const': ['warn'],
      'import-x/no-default-export': ['warn'],
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
    },
  },
);
