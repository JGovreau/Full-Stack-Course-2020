import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

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
  query AllBooks {
    allBooks {
      author {
        id
        name
      }
      id
      published
      title
      genres
    }
  }
`

export const ALL_BOOKS_FILTERED = gql`
  query AllBooksFiltered($genre: String) {
    allBooks(genre: $genre) {
      author {
        id
        name
      }
      id
      published
      title
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author {
        id
        name
      }
      genres
      published
      title
    }
  }
`

export const UPDATE_BIRTH_YEAR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      id
      name
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
