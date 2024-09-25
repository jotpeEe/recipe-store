import { type FC, useEffect, useMemo } from 'react';

import cn from 'classnames';
import { hasCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';

import { useAppDispatch, useAuth, useScrollUp } from '@hooks';
import Icon from '@icons';
import { setNavState } from 'client/redux/reducers/statusSlice';

const Nav: FC<{ type?: 'alwaysActive' | 'withScroll' }> = ({
    type = 'withScroll',
}) => {
    const dispatch = useAppDispatch();
    const scrollup = useScrollUp();
    const { handleClick } = useAuth('logout');
    const loggedIn = hasCookie('logged_in');

    const nav = useMemo(
        () => [
            {
                name: 'Home',
                icon: <Icon name="Home" />,
                href: '/',
            },
            {
                name: 'Recipes',
                icon: <Icon name="List" />,
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
                icon: <Icon name="Profile" />,
                href: '/profile',
                auth: true,
            },
            {
                name: 'Reviews',
                icon: <Icon name="Reviews" />,
                href: '/#reviews',
                auth: false,
            },
            {
                name: 'Log in',
                icon: <Icon name="Login" />,
                href: '/auth',
                auth: false,
            },
        ],
        []
    );

    useEffect(() => {
        if (scrollup) dispatch(setNavState('active'));
        if (!scrollup) dispatch(setNavState('hidden'));
    }, [scrollup]);

    return (
        <header
            className={cn(
                'fixed bottom-0 left-0 z-[100] h-14 w-full shadow-card shadow-gray-400 transition duration-200 ease-in-out',
                'sm:top-0 sm:bottom-auto sm:h-16  sm:shadow-none',
                type === 'alwaysActive'
                    ? 'bg-white'
                    : 'bg-white  sm:bg-transparent ',
                !scrollup && type === 'withScroll' && 'sm:-translate-y-full'
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
                                        'relative flex flex-col items-center justify-center rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:shadow-lg ',
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
                                            'sm:text-sm'
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
                                'flex max-w-[100px] flex-auto flex-col items-center justify-center rounded-2xl  transition-all duration-300 hover:bg-gray-100 hover:shadow-lg sm:py-2 ',
                                'sm:px-5 sm:[&>*:first-child]:hidden'
                            )}
                            onClick={handleClick}
                        >
                            <Icon name="Logout" />
                            <span className="whitespace-nowrap text-[10px] font-semibold sm:text-sm">
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
