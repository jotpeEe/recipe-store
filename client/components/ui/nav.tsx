import {
    type FC,
    type HTMLAttributes,
    type PropsWithChildren,
    useMemo,
} from 'react';

import { hasCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';

import Icon, { type IconNames } from '@components/icons';
import { useAuth, useScrollUp } from '@hooks';
import { cn } from '@lib/utils';

type IconType = 'Home' | 'List' | 'Login' | 'Logout' | undefined;

const NavItem: FC<
    PropsWithChildren &
        HTMLAttributes<HTMLLIElement> & {
            href: string;
            auth?: boolean;
            loggedIn?: boolean;
        }
> = ({ children, href, auth, loggedIn, ...props }) => {
    if (auth === loggedIn || auth === undefined)
        return (
            <li {...props}>
                <Link
                    className="relative flex max-w-[100px] flex-auto flex-col items-center justify-center rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:shadow-lg sm:py-2 sm:px-5 sm:[&>*:first-child]:hidden"
                    href={href}
                >
                    {children}
                </Link>
            </li>
        );
    return null;
};

const NavItemText: FC<PropsWithChildren> = ({ children }) => (
    <span className="whitespace-nowrap text-[10px] font-semibold sm:text-base">
        {children}
    </span>
);

const NavBar: FC<{ alwaysActive?: boolean }> = ({ alwaysActive }) => {
    const scrollup = useScrollUp();
    const hasLoginCookie = hasCookie('logged_in');
    const { handleClick } = useAuth('logout');

    const nav: {
        name?: string;
        button?: boolean;
        icon?: IconType;
        href: string;
        auth?: boolean;
    }[] = useMemo(
        () => [
            {
                name: 'Home',
                href: '/',
            },
            {
                name: 'Recipes',
                icon: 'List',
                href: '/#recipes',
            },
            {
                element: true,
                href: '/create',
                auth: true,
            },

            {
                name: 'Profile',
                href: '/profile',
                auth: true,
            },
            {
                name: 'Reviews',
                href: '/#reviews',
                auth: false,
            },
            {
                name: 'Log in',
                icon: 'Login',
                href: '/auth',
                auth: false,
            },
            {
                name: 'Log out',
                icon: 'Logout',
                href: '/',
                auth: true,
            },
        ],
        []
    );

    return (
        <header
            className={cn(
                'sm:shadow-nonbe fixed bottom-0 left-0 z-[100] h-14 w-full bg-white shadow-card shadow-gray-400 transition  duration-200 ease-in-out sm:top-0 sm:bottom-auto sm:h-16',
                !scrollup && !alwaysActive && 'sm:-translate-y-full'
            )}
        >
            <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-6 sm:justify-between md:px-12">
                <Link className="z-40 hidden sm:block" href="/">
                    <Image src="/logo.png" width={63} height={27} alt="logo" />
                </Link>
                <nav>
                    <ul className="flex w-full items-center justify-center sm:w-fit sm:gap-3">
                        {nav.map(({ icon, name, button, ...rest }, index) => (
                            <NavItem
                                key={index}
                                {...rest}
                                loggedIn={hasLoginCookie}
                            >
                                <Icon name={icon || (name as IconNames)} />
                                <NavItemText>{name}</NavItemText>
                                {/* {button && (
                                    <div className="h-16 w-16 flex-auto -translate-y-2 rounded-full border-8 border-white bg-primary">
                                        <div className="flex h-full items-center justify-center text-[24px] text-white">
                                            +
                                        </div>
                                    </div>
                                )} */}
                            </NavItem>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
