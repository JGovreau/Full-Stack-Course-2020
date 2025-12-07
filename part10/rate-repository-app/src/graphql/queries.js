import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Edges {
  repositories {
    edges {
      node {
        createdAt
        description
        forksCount
        fullName
        id
        language
        name
        ownerAvatarUrl
        ownerName
        ratingAverage
        reviewCount
        stargazersCount
      }
    }
  }
}
`;

