import { gql } from '@apollo/client';

export const GET_BRANDS = gql`
  query GetBrands($locale: String!, $section: String) {
    brands(locale: $locale, section: $section) {
      brands {
        id
        name
        locale
        section
      }
    }
  }
`;
