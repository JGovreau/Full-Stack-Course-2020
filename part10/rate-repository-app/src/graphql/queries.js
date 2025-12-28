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

export const GET_REPOSITORY_BY_ID = gql`
query Repository($id: ID!) {
  repository(id: $id) {
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
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const USER_SIGN_IN = gql`
mutation SignIn($username: String!, $password: String!) {
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`;

export const GET_SIGNED_IN_USER = gql`
query Me {
  me {
    username
    id
  }
}
`;
