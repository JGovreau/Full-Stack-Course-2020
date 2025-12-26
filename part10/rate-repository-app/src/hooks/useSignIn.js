import { useMutation } from '@apollo/client/react';
import { USER_SIGN_IN } from '../graphql/queries.js'
import useAuthStorage from './useAuthStorage.js';
import { useApolloClient } from '@apollo/client/react';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate] = useMutation(USER_SIGN_IN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username,
        password
      }
    });

    const accessToken = response.data.authenticate.accessToken;
    await authStorage.setAccessToken(accessToken);

    apolloClient.resetStore();
    return accessToken;
  };

  return [signIn];
};

export default useSignIn;
