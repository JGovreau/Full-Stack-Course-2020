import { useLazyQuery } from '@apollo/client/react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepositoryItem = (itemId) => {

  const [fetchRepositoryItem, { loading }] = useLazyQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network'
  });

  return { fetchRepositoryItem, loading };
};

export default useRepositoryItem;
