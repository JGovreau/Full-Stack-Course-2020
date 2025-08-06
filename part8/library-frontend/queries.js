import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query AllAuthors {
    allBooks {
      author
      id
      published
      title
    }
  }
`