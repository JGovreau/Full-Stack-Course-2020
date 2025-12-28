import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

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

  const navigate = useNavigate();
  const { repositories } = useRepositories();
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const handleRepositoryItemPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      style={styles.flatList}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item, index}) => (
        <Pressable onPress={() => handleRepositoryItemPress(item.id)}>
          <RepositoryItem key={index} item={item} fullItemDisplay={false} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;
