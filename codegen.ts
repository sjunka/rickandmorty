import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * Generates TypeScript types for the GraphQL schema and our operations.
 * Run with `npm run codegen`. The output is committed, so the build never
 * depends on the API being reachable.
 */
const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/services/queries.ts'],
  generates: {
    'src/services/graphql.generated.ts': {
      // typescript-operations v5 emits self-contained types, inputs included,
      // so adding the typescript plugin would only duplicate them.
      plugins: ['typescript-operations'],
    },
  },
};

export default config;
