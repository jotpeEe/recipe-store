import { type FC, useMemo } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import {
    IconHome,
    IconList,
    IconLogin,
    IconLogout,
    IconProfile,
    IconReviews,
} from '@components/icons';
import { useLogout, useScrollUp } from '@hooks';

const Nav: FC = () => {
    const scroll = useScrollUp();
    const { loggedIn, handleClick } = useLogout();

    const nav = useMemo(
        () => [
            {
                name: 'Home',
                icon: <IconHome />,
                href: '/',
            },
            {
                name: 'Recipes',
                icon: <IconList />,
                href: '/#recipes',
            },
            {
                icon: (
                    <div className="h-16 w-16 flex-auto -translate-y-2 rounded-full border-8 border-white bg-primary">
                        <div className="flex h-full items-center justify-center text-[24px] text-white">
                            +
                        </div>
                    </div>
                ),
                href: '/create',
                auth: true,
            },
            {
                name: 'Profile',
                icon: <IconProfile />,
                href: '/profile',
                auth: true,
            },
            {
                name: 'Reviews',
                icon: <IconReviews />,
                href: '/#reviews',
                auth: false,
            },
            {
                name: 'Log in',
                icon: <IconLogin />,
                href: '/auth',
                auth: false,
            },
        ],
        []
    );

    return (
        <header
            className={cn(
                'fixed bottom-0 left-0 z-[100] h-14 w-full bg-white shadow-card shadow-gray-400 transition duration-200 ease-in-out',
                'sm:top-0 sm:bottom-auto sm:h-20 sm:bg-transparent sm:shadow-none',
                !scroll && 'sm:-translate-y-full'
            )}
        >
            <div
                className={cn(
                    'mx-auto flex h-full max-w-7xl items-center justify-center px-6',
                    'sm:justify-between md:px-12 '
                )}
            >
                <Link className="z-40 hidden sm:block" href="/">
                    <Image src="/logo.png" width={63} height={27} alt="logo" />
                </Link>
                <nav
                    className={cn(
                        'z-40 flex w-full items-center justify-center',
                        'sm:w-fit sm:gap-3 '
                    )}
                >
                    {nav.map(({ href, icon, name, auth }, index) => {
                        if (auth === loggedIn || auth === undefined)
                            return (
                                <Link
                                    className={cn(
                                        'relative flex flex-col items-center justify-center ',
                                        'sm:py-2 sm:px-5 sm:[&>*:first-child]:hidden',
                                        name
                                            ? 'max-w-[100px] flex-auto'
                                            : 'sm:hidden'
                                    )}
                                    key={index}
                                    href={href}
                                >
                                    {icon}
                                    <span
                                        className={cn(
                                            'whitespace-nowrap text-[10px] font-semibold',
                                            'sm:text-base'
                                        )}
                                    >
                                        {name}
                                    </span>
                                </Link>
                            );
                        return null;
                    })}
                    {loggedIn && (
                        <button
                            className={cn(
                                'flex max-w-[100px] flex-auto flex-col items-center justify-center sm:py-2',
                                'sm:px-5 sm:[&>*:first-child]:hidden'
                            )}
                            onClick={handleClick}
                        >
                            <IconLogout />
                            <span className="whitespace-nowrap text-[10px] font-semibold sm:text-base">
                                Log out
                            </span>
                        </button>
                    )}
                </nav>
            </div>

            <div className="absolute left-0 top-0 right-0 bottom-0 z-10 hidden bg-nav backdrop-blur sm:block "></div>
        </header>
    );
};

export default Nav;
