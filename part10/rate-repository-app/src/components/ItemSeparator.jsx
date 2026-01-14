import { View } from "react-native";
import { StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  flatList: {
    backgroundColor: theme.colors.pageBackgroundColor
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;
