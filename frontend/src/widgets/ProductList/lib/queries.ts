import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts(
    $locale: String!
    $first: Int!
    $after: String
    $section: String
    $brandId: Int
  ) {
    products(
      locale: $locale
      first: $first
      after: $after
      section: $section
      brandId: $brandId
    ) {
      edges {
        node {
          id
          name
          description
          image
          brand {
            id
            name
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;
