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
                'fixed sm:top-0 sm:bottom-auto bottom-0 left-0 transition ease-in-out bg-white sm:bg-transparent sm:shadow-none shadow-card shadow-gray-400 sm:h-20 h-14 duration-200 w-full z-[100]',
                !scroll && 'sm:-translate-y-full'
            )}
        >
            <div className="flex sm:justify-between justify-center items-center h-full max-w-7xl mx-auto md:px-12 px-6">
                <Link className="sm:block hidden z-40" href="/">
                    <Image src="/logo.png" width={63} height={27} alt="logo" />
                </Link>
                <nav
                    className={cn(
                        'flex items-center justify-center sm:gap-3 sm:w-fit w-full z-40'
                    )}
                >
                    {nav.map(({ href, icon, name, auth }, index) => {
                        if (auth === loggedIn || auth === undefined)
                            return (
                                <Link
                                    className={cn(
                                        'relative flex justify-center sm-py-2 sm:px-5 items-center flex-col sm:[&>*:first-child]:hidden',
                                        name
                                            ? 'flex-auto max-w-[100px]'
                                            : 'sm:hidden'
                                    )}
                                    key={index}
                                    href={href}
                                >
                                    {icon}
                                    <span className="text-[10px] sm:text-base font-semibold whitespace-nowrap">
                                        {name}
                                    </span>
                                </Link>
                            );
                        return null;
                    })}
                    {loggedIn && (
                        <button
                            className="flex-auto max-w-[100px] flex justify-center sm-py-2 sm:px-5 items-center flex-col sm:[&>*:first-child]:hidden"
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
