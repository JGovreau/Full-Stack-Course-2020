import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  flatList: {
    backgroundColor: theme.colors.pageBackgroundColor
  }
});

const RepositoryList = () => {

  const navigate = useNavigate();
  const { repositories, fetchMore } = useRepositories({ first: 6 });
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const handleRepositoryItemPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const onEndReached = () => {
    console.log('onEndReached');
    fetchMore();

  };

  return (
    <FlatList
      style={styles.flatList}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item, index}) => (
        <Pressable onPress={() => handleRepositoryItemPress(item.id)}>
          <RepositoryItem key={index} repositoryItemDetails={item} fullItemDisplay={false} />
        </Pressable>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;
