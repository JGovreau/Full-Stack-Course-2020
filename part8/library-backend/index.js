const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
const user = require('./models/user');
mongoose.set('strictQuery', false);
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  });


const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async () => await Book.find({}),
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author);
    }
  },
  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      let author = await Author.findOne({ name: args.author });
      let newAuthor = !author;
      if (newAuthor) {
        author = new Author({ name: args.author });

        try {
          await author.save();
        }
        catch (error) {
          throw new GraphQLError('Failed to save author.', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          });
        }

      }

      const newBook = new Book({ ...args, author: author._id });
      try {
        await newBook.save();
      }
      catch (error) {
        if (newAuthor) {
          await Author.findByIdAndRemove(author._id);
        }
        throw new GraphQLError('Failed to save book.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        });
      }
      return newBook;

    },
    // editAuthor: (root, args) => {
    //     const author = authors.find(author => author.name === args.name);
    //     if (!author) { return null; }

    //     author.born = args.setBornTo;
    //     return author;
    // },
    createUser: async(root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });
      try {
        await user.save();
      }
      catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
      return user;
    },
    login: async(root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})