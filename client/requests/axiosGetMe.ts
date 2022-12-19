import axios from 'axios';

import { GRAPHQL_ENDPOINT } from '@constants';
import { GetMeQuery } from '@generated/graphql';

const authApi = axios.create({
    baseURL: GRAPHQL_ENDPOINT,
    withCredentials: true,
});

const axiosGetMe = async (data: string, access_token: string) => {
    const response = await authApi.post<GetMeQuery>(
        '',
        { query: data },
        {
            headers: {
                cookie: `access_token=${access_token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

export default axiosGetMe;
