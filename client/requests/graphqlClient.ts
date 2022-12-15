import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';

import { GRAPHQL_ENDPOINT } from '@constants';

const graphqlRequestClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    credentials: 'include',
    mode: 'cors',
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 1000,
        },
    },
});

export default graphqlRequestClient;
