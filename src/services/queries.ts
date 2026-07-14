import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query Characters($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        image
        species
        status
        gender
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
      gender
      type
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;
