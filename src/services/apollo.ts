import { ApolloClient, HttpLink, InMemoryCache, type Reference } from '@apollo/client';
import { GRAPHQL_URL } from '@/constants';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Merge paginated pages into a single list keyed by the filter,
          // so fetchMore appends instead of replacing results. Deduplicated
          // because onEndReached can request the same page twice.
          characters: {
            keyArgs: ['filter'],
            merge(existing, incoming, { readField }) {
              const merged: Reference[] = [...(existing?.results ?? [])];
              const seenIds = new Set(merged.map((ref) => readField('id', ref)));
              for (const ref of incoming.results as Reference[]) {
                if (!seenIds.has(readField('id', ref))) {
                  merged.push(ref);
                }
              }
              return { ...incoming, results: merged };
            },
          },
        },
      },
    },
  }),
});
