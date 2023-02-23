import { FC, useMemo } from 'react';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import {
    IconList,
    IconHome,
    IconProfile,
    IconLogout,
    IconReviews,
    IconLogin,
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
                    <div className="bg-primary h-16 w-16 flex-auto rounded-full -translate-y-2 border-white border-8">
                        <div className="flex justify-center items-center h-full text-[24px] text-white">
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
                'fixed h-14 w-full bottom-0 left-0 bg-white shadow-card shadow-gray-400 duration-200 transition ease-in-out z-[100]',
                'sm:h-20 sm:top-0 sm:bottom-auto sm:bg-transparent sm:shadow-none',
                !scroll && 'sm:-translate-y-full'
            )}
        >
            <div
                className={cn(
                    'flex justify-center items-center h-full max-w-7xl mx-auto px-6',
                    'md:px-12 sm:justify-between '
                )}
            >
                <Link className="sm:block hidden z-40" href="/">
                    <Image src="/logo.png" width={63} height={27} alt="logo" />
                </Link>
                <nav
                    className={cn(
                        'flex items-center justify-center w-full z-40',
                        'sm:gap-3 sm:w-fit '
                    )}
                >
                    {nav.map(({ href, icon, name, auth }, index) => {
                        if (auth === loggedIn || auth === undefined)
                            return (
                                <Link
                                    className={cn(
                                        'relative flex justify-center items-center flex-col ',
                                        'sm:py-2 sm:px-5 sm:[&>*:first-child]:hidden',
                                        name
                                            ? 'flex-auto max-w-[100px]'
                                            : 'sm:hidden'
                                    )}
                                    key={index}
                                    href={href}
                                >
                                    {icon}
                                    <span
                                        className={cn(
                                            'text-[10px] font-semibold whitespace-nowrap',
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
                                'flex-auto max-w-[100px] flex justify-center sm:py-2 items-center flex-col',
                                'sm:[&>*:first-child]:hidden sm:px-5'
                            )}
                            onClick={handleClick}
                        >
                            <IconLogout />
                            <span className="text-[10px] sm:text-base font-semibold whitespace-nowrap">
                                Log out
                            </span>
                        </button>
                    )}
                </nav>
            </div>

            <div className="sm:block hidden bg-nav absolute backdrop-blur z-10 left-0 top-0 right-0 bottom-0 "></div>
        </header>
    );
};

export default Nav;
