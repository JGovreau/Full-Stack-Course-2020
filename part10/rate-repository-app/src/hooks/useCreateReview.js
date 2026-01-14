import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/queries.js'

const useCreateReview = () => {
    const [mutate] = useMutation(CREATE_REVIEW);

    const createReview = async ({ ownerName, repositoryName, rating, text }) => {
        const response = await mutate({
            variables: {
                ownerName,
                repositoryName,
                rating: Number(rating),
                text
            }
        });
        return response;
    };

    return [createReview];
};

export default useCreateReview;
