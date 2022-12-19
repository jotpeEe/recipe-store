import { GraphQLClient } from 'graphql-request';

import { GRAPHQL_ENDPOINT } from '@constants';

const requestClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    credentials: 'include',
    mode: 'cors',
});

export default requestClient;
