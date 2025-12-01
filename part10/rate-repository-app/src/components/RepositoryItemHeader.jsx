import { Image, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const RepositoryItemHeader = ({ item }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
        <Image
            source={{ uri: item.ownerAvatarUrl }}
            style={{ width: 50, height: 50 }}
        />
        <View style={{ flexDirection: 'column', marginLeft: 10, flexShrink: 1 }}>
            <Text fontWeight="bold">{item.fullName}</Text>
            <Text color="textSecondary">{item.description}</Text>
            <Text style={{ fontFamily: 'monospace', backgroundColor: theme.colors.primaryButtonBackgroundColor, color: 'white', alignSelf: 'flex-start', padding: 4, borderRadius: 4, marginTop: 4 }}>{item.language}</Text>
        </View>
    </View>
  );
};

export default RepositoryItemHeader;
