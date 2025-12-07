import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'http://192.168.3.157:4000/graphql',
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;