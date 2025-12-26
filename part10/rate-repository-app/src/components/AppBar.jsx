import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { GET_SIGNED_IN_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    flexDirection: 'row'
  }
});

const AppBar = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const { data } = useQuery(GET_SIGNED_IN_USER, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    setIsSignedIn(data && data.me);
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" linkTo={"/"} />
        { isSignedIn
          ? <AppBarTab title="Sign Out" linkTo={"/signout"} />
          : <AppBarTab title="Sign In" linkTo={"/signin"} />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
