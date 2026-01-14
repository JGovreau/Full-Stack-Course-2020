import { View, Pressable } from 'react-native';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemData from './RepositoryItemData';
import { useEffect, useState } from 'react';
import useRepositoryItem from '../hooks/useRepositoryItem';
import { useParams } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';

const RepositoryItem = ({repositoryItemDetails, fullItemDisplay}) => {

  // const [itemToDisplay, setItemToDisplay] = useState(item ? item : null);

  // const { repositoryId } = useParams();
  // const { fetchRepositoryItem } = useRepositoryItem(repositoryId);

  // useEffect(() => {
  //   if (!itemToDisplay && repositoryId) {
  //     fetchRepositoryItem({ variables: { id: repositoryId } }).then(result => {
  //       setItemToDisplay(result.data.repository);
  //     });
  //   }
  // }, [repositoryId]);

  const handleGithubRedirect = () => {
    Linking.openURL(repositoryItemDetails.url);
  };

  return repositoryItemDetails
  ? (
      <View style={{ backgroundColor: 'white', padding: 10, flexDirection: 'column' }}>
        <RepositoryItemHeader item={repositoryItemDetails} />
        <RepositoryItemData item={repositoryItemDetails} />
        { fullItemDisplay &&
          <Pressable onPress={handleGithubRedirect}>
            <View style={{ backgroundColor: theme.colors.primaryButtonBackgroundColor, padding: 10, borderRadius: 4, marginTop: 10 }}>
              <Text fontWeight={"bold"} style={{ color: 'white', alignSelf: 'center' }}>Open in GitHub</Text>
            </View>
          </Pressable>
        }
      </View>
    )
  : null;
};

export default RepositoryItem;
