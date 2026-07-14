import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Merge paginated pages into a single list keyed by the filter,
          // so fetchMore appends instead of replacing results.
          characters: {
            keyArgs: ['filter'],
            merge(existing, incoming) {
              return {
                ...incoming,
                results: [...(existing?.results ?? []), ...incoming.results],
              };
            },
          },
        },
      },
    },
  }),
});
