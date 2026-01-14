import Text from "./Text";
import { View } from "react-native";

const Review = ({ review }) => {

    console.log("Review data:", review);
    return (
        <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#0366d6', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text fontWeight="bold" style={{ color: '#0366d6' }}>{review.rating}</Text>
            </View>
            <View style={{ backgroundColor: 'white', padding: 10, marginBottom: 10, flex: 1 }}>
                <Text fontWeight="bold" style={{ marginBottom: 5 }}>{review.user.username}</Text>
                <Text style={{ color: 'gray', marginBottom: 5 }}>{new Date(review.createdAt).toLocaleDateString()}</Text>
                <Text style={{ marginBottom: 5 }}>{review.text}</Text>
            </View>
        </View>
    )
};

export default Review;
