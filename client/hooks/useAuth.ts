import { gql } from 'graphql-request';
import router from 'next/router';

import {
    GetMeQuery,
    useGetMeQuery,
    useLoginUserMutation,
    useSignUpUserMutation,
} from '@generated/graphql';
import { IUser } from '@lib/types';
import { setUser } from '@redux';
import { requestClient } from '@requests';

import { useAppDispatch } from './redux';

const useAuth = () => {
    const dispatch = useAppDispatch();

    const REFRESH_ACCESS_TOKEN = gql`
        query {
            refreshAccessToken {
                status
                access_token
            }
        }
    `;
    const checkAuth = useGetMeQuery(
        requestClient,
        {},
        {
            enabled: false,
            onSuccess: data => {
                dispatch(setUser(data.getMe.user as IUser));
            },
        }
    );

    const loginMutation = useLoginUserMutation<Error>(requestClient, {
        onSuccess() {
            checkAuth.refetch();
            router.push('/');
        },
    });

    const signupMutation = useSignUpUserMutation<Error>(requestClient, {
        onSuccess() {
            checkAuth.refetch();
            router.push('/');
        },
    });

    const authRefresh = () => {
        const refreshQuery = useGetMeQuery<GetMeQuery, Error>(
            requestClient,
            {},
            {
                retry: 1,
                onSuccess: data => {
                    dispatch(setUser(data.getMe.user as IUser));
                },
                onError(error: any) {
                    error.response.errors.forEach(async (err: any) => {
                        if (err.message.includes('not logged in')) {
                            try {
                                await requestClient.request(
                                    REFRESH_ACCESS_TOKEN
                                );
                                refreshQuery.refetch();
                            } catch (e) {
                                document.location.href = '/login';
                            }
                        }
                    });
                },
            }
        );
    };

    const { mutate: signUpUser } = signupMutation;
    const { mutate: loginUser } = loginMutation;

    return {
        loginUser,
        loginStatus: loginMutation.isLoading,
        signUpUser,
        signUpStatus: signupMutation.isLoading,
        checkAuth,
        authRefresh,
    };
};

export default useAuth;
