import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const typedFiles = ['**/*.{ts,tsx}'];

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.astro/**',
      'apps/crm-api/src/generated/**',
      'apps/crm-web/src/routeTree.gen.ts',
      // Fontes oficiais e protótipos não passam pelo lint
      'specs/**',
      'prototypes/**',
      'assets/**',
    ],
  },

  js.configs.recommended,

  // TypeScript com verificação de tipos
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({ ...config, files: typedFiles })),
  {
    files: typedFiles,
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },

  // Arquivos de configuração em JS não têm tipos
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: { globals: globals.node },
  },

  // crm-api (Node)
  {
    files: ['apps/crm-api/**/*.ts'],
    languageOptions: { globals: globals.node },
  },

  // crm-web (React)
  {
    files: ['apps/crm-web/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'jsx-a11y': jsxA11y, 'react-hooks': reactHooks },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },

  // landing (Astro)
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],

  // Camadas da API (ADR-0002)
  {
    files: ['apps/crm-api/src/**/*.controller.ts', 'apps/crm-api/src/**/*.use-case.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@prisma/client',
              message: 'Só os repositórios Prisma importam o Prisma (ADR-0002).',
            },
          ],
          patterns: [
            {
              group: ['**/generated/prisma/**', '**/shared/database/**'],
              message: 'Só os repositórios Prisma importam o Prisma (ADR-0002).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['apps/crm-api/src/**/*.use-case.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@prisma/client',
              message: 'Use cases não importam o Prisma (ADR-0002).',
            },
            {
              name: 'express',
              message: 'Use cases não importam o Express (ADR-0002).',
            },
          ],
          patterns: [
            {
              group: ['**/generated/prisma/**', '**/shared/database/**'],
              message: 'Use cases não importam o Prisma (ADR-0002).',
            },
          ],
        },
      ],
    },
  },
);
