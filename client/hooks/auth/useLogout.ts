import {
    type Dispatch,
    type MouseEventHandler,
    type SetStateAction,
    useCallback,
} from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useLogoutUserQuery } from '@generated/graphql';
import { resetUser } from '@redux';
import { requestClient } from '@requests';

import { useAppDispatch } from '../redux';

export type LogoutReturnType = {
    handleClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

const useLogout = (setMenuStatus?: Dispatch<SetStateAction<boolean>>) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const queryClient = useQueryClient();
    const { refetch } = useLogoutUserQuery(
        requestClient,
        {},
        {
            enabled: false,
            onSuccess() {
                queryClient.clear();
                dispatch(resetUser());
                router.push('/');
            },
            onError(error: any) {
                error.response.errors.forEach(() => {
                    queryClient.clear();
                });
            },
        }
    );

    const handleClick: MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
    > = useCallback(e => {
        e.preventDefault();
        refetch();
        if (setMenuStatus) setMenuStatus(false);
    }, []);

    return {
        handleClick,
    };
};

export default useLogout;
