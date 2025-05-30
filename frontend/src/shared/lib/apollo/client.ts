import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: ['locale', 'section', 'brandId'],
            merge(existing = { edges: [] }, incoming) {
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            },
          },
          brands: {
            keyArgs: ['locale', 'section'],
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
