import {
    type Dispatch,
    type MouseEventHandler,
    type SetStateAction,
    useCallback,
} from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import { useLogoutUserQuery } from '@generated/graphql';
import { resetUser } from '@redux';
import { requestClient } from '@requests';

import { useAppDispatch } from './redux';

const useLogout = (setMenuStatus?: Dispatch<SetStateAction<boolean>>) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const loggedIn = hasCookie('logged_in');

    const queryClient = useQueryClient();
    const { refetch } = useLogoutUserQuery(
        requestClient,
        {},
        {
            enabled: false,
            onSuccess() {
                queryClient.clear();
                router.push('/auth');
            },
            onError(error: any) {
                error.response.errors.forEach(() => {
                    queryClient.clear();
                    router.push('/auth');
                });
            },
        }
    );

    const handleClick: MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
    > = useCallback(e => {
        e.preventDefault();
        refetch();
        dispatch(resetUser());
        if (setMenuStatus) setMenuStatus(false);
    }, []);

    return {
        handleClick,
        loggedIn,
    };
};

export default useLogout;
