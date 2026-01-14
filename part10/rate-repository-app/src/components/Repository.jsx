import { FlatList } from "react-native";
import Review from "./Review";
import RepositoryItem from "./RepositoryItem";
import useRepositoryItem from "../hooks/useRepositoryItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-native";

const Repository = () => {

    const [repositoryItem, setRepositoryItem] = useState(null);

    const { repositoryId } = useParams();
    const { fetchRepositoryItem } = useRepositoryItem(repositoryId);

    useEffect(() => {
        if (repositoryId) {
            fetchRepositoryItem({ variables: { id: repositoryId } }).then(result => {
                setRepositoryItem(result.data.repository);
            });
        }
    }, [repositoryId]);

    return (
        <FlatList
            data={repositoryItem?.reviews?.edges?.map(edge => edge.node) || []}
            renderItem={({ item }) => <Review review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem repositoryItemDetails={repositoryItem} fullItemDisplay={true} />}
        />
    );
};

export default Repository;
