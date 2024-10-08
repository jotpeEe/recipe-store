import { GraphQLClient } from 'graphql-request';

import { GRAPHQL_ENDPOINT } from '@constants';

if (!GRAPHQL_ENDPOINT) throw new Error('GRAPHQL_ENDPOINT not defined');

const requestClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    credentials: 'include',
    mode: 'cors',
});

export default requestClient;
