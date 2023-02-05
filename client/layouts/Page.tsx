import { useRef } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useRefreshAccessTokenQuery, useGetMeQuery } from '@generated/graphql';
import { useAppDispatch } from '@hooks';
import { IUser } from '@lib/types';
import { setPageLoading, setUser } from '@redux';
import { queryClient, requestClient } from '@requests';

const Nav = dynamic(() => import('../components/nav'), { ssr: false });

type PageProps = {
    children: React.ReactNode;
    enableAuth?: boolean;
};

const Page: React.FC<PageProps> = ({ children, enableAuth }) => {
    const disabled = useRef(true);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const query = useRefreshAccessTokenQuery(
        requestClient,
        {},
        {
            enabled: !!enableAuth && disabled.current,
            retry: 1,
            onError() {
                disabled.current = false;
                router.push('/auth');
            },
            onSuccess() {
                queryClient.refetchQueries('getMe');
            },
        }
    );

    useGetMeQuery(
        requestClient,
        {},
        {
            onSuccess: data => {
                dispatch(setPageLoading(false));
                dispatch(setUser(data.getMe.user as IUser));
            },
            retry: 1,
            enabled: !!enableAuth,
            onError(error: any) {
                dispatch(setPageLoading(false));
                error.response.errors.forEach((err: any) => {
                    if (err.message.includes('No access token found')) {
                        query.refetch({ throwOnError: true });
                    }
                });
            },
        }
    );

    return (
        <div className="flex min-h-screen flex-col py-2">
            <Nav />

            <main className="flex w-full flex-1 flex-col">{children}</main>

            {/* <footer className="flex h-24 w-full items-center justify-center border-t">
                <a
                    className="flex items-center justify-center gap-2"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        width={72}
                        height={16}
                    />
                </a>
            </footer> */}
        </div>
    );
};

export default Page;
