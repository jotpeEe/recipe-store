import { GraphQLClient } from 'graphql-request';

import { GRAPHQL_ENDPOINT } from 'utils/constants';

if (!GRAPHQL_ENDPOINT) throw new Error('GRAPHQL_ENDPOINT not defined');

const requestClient = new GraphQLClient(GRAPHQL_ENDPOINT as string, {
    credentials: 'include',
    mode: 'cors',
});

export default requestClient;
