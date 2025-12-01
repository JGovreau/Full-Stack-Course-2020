import { View } from "react-native";
import Text from "./Text";

const convertCountDisplay = (count) => {
    if (count < 1000) {
        return String(count);
    } else {
        return String(count)[0] + '.' + String(count)[1] + 'k';
    }
};

const RepositoryItemData = ({ item }) => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <View style={{ alignItems: 'center' }}>
                <Text fontWeight="bold">{convertCountDisplay(item.stargazersCount)}</Text>
                <Text color="textSecondary">Stars</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text fontWeight="bold">{convertCountDisplay(item.forksCount)}</Text>
                <Text color="textSecondary">Forks</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text fontWeight="bold">{convertCountDisplay(item.reviewCount)}</Text>
                <Text color="textSecondary">Reviews</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text fontWeight="bold">{convertCountDisplay(item.ratingAverage)}</Text>
                <Text color="textSecondary">Rating</Text>
            </View>
        </View>
    );
};

export default RepositoryItemData;
