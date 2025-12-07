import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  flatList: {
    backgroundColor: theme.colors.pageBackgroundColor
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const { repositories } = useRepositories();
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      style={styles.flatList}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item, index}) => (
        <RepositoryItem key={index} item={item} />
      )}
    />
  );
};

export default RepositoryList;
