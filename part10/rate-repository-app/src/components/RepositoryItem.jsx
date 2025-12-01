import { View } from 'react-native';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemData from './RepositoryItemData';

const RepositoryItem = ({item}) => {
    return (
        <View style={{ backgroundColor: 'white', padding: 10, flexDirection: 'column' }}>
          <RepositoryItemHeader item={item} />
          <RepositoryItemData item={item} />
        </View>
    );
};

export default RepositoryItem;
