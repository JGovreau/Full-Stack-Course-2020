import Main from './src/components/main.jsx';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage.js';
import AuthStorageContext from './src/contexts/AuthStorageContext.js';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.expoConfig);

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
