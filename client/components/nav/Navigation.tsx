import { FC, MouseEventHandler, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { hasCookie } from 'cookies-next';
import Link from 'next/link';
import { useQueryClient } from 'react-query';

import AnimateOnLoad from '@components/animations/AnimateOnLoad';
import { useLogoutUserQuery } from '@generated/graphql';
import { useAppDispatch } from '@hooks';
import { NavState } from '@lib/types';
import { resetUser } from '@redux';
import { requestClient } from '@requests';

type NavItems = {
    title: string;
    url?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onLogin?: boolean;
}[];

const Navigation: FC<NavState> = ({ open, setOpen }) => {
    const dispatch = useAppDispatch();
    const loggedIn = hasCookie('logged_in');

    const queryClient = useQueryClient();
    const { refetch } = useLogoutUserQuery(
        requestClient,
        {},
        {
            enabled: false,
            onSuccess() {
                queryClient.clear();
                document.location.href = '/auth';
            },
            onError(error: any) {
                error.response.errors.forEach(() => {
                    queryClient.clear();
                    document.location.href = '/auth';
                });
            },
        }
    );

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(e => {
        e.preventDefault();
        refetch();
        dispatch(resetUser());
        setOpen(false);
    }, []);

    const options: NavItems = useMemo(
        () => [
            {
                title: 'Recipes',
                url: '/#recipes',
            },
            {
                title: 'Reviews',
                url: '/#reviews',
            },
            {
                title: 'Signin',
                url: '/auth',
                onLogin: false,
            },
            {
                title: 'Profile',
                url: '/profile',
                onLogin: true,
            },
            {
                title: 'Logout',
                onClick: handleClick,
                onLogin: true,
            },
        ],
        []
    );

    return (
        <nav
            className={cn(
                'sm:static absolute sm:w-fit w-full left-0 top-[80px] trainsition duration-300',
                !open && 'sm:translate-x-0 translate-x-full'
            )}
        >
            <ul
                className={
                    'flex sm:flex-row flex-col sm:gap-3 sm:bg-transparent bg-white sm:items-center items-start'
                }
            >
                {options.map(({ title, url, onLogin, onClick }, index) => (
                    <AnimateOnLoad key={index} index={index}>
                        <li className={'flex gap-3 sm:w-fit w-full'}>
                            {url ? (
                                <>
                                    {(onLogin === loggedIn ||
                                        onLogin === undefined) && (
                                        <Link
                                            className="sm:px-5 pl-6 sm:py-2 py-5 sm:w-fit w-full"
                                            href={url}
                                            onClick={() => setOpen(false)}
                                        >
                                            <h5>{title}</h5>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    {loggedIn && (
                                        <button
                                            className="flex sm:px-5 pl-6 py-2 sm:w-fit w-full"
                                            onClick={onClick}
                                        >
                                            <h5>{title}</h5>
                                        </button>
                                    )}
                                </>
                            )}
                        </li>
                    </AnimateOnLoad>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
