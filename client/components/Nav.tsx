import { FC, ReactNode } from 'react';

import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

import { Button } from '@components';
import useScrollUp from '@hooks/useScrollUp';

type NavItemProps = LinkProps & {
    children: ReactNode;
};

const NavItem: FC<NavItemProps> = ({ href, children }) => (
    <li className="">
        <Link className="block w-full px-5 py-2" href={href}>
            <h5>{children}</h5>
        </Link>
    </li>
);

const Nav: FC = () => {
    const scrollUp = useScrollUp();

    return (
        <nav
            className={`${
                !scrollUp ? '-translate-y-32' : ''
            } h-20 bg-transparent fixed top-0 lef-0 transition ease-in-out duration-200 w-full z-50`}
        >
            <div className="flex justify-between absolute left-0 right-0 bottom-0 top-0 items-center z-10 max-w-7xl mx-auto">
                <Link href="/">
                    <Image src="/logo.png" width={63} height={27} alt="logo" />
                </Link>
                <ul className="flex gap-3 items-center">
                    <NavItem href="/#recipes">Recipes</NavItem>
                    <NavItem href="/#reviews">Reviews</NavItem>
                    <NavItem href="/login">Log in</NavItem>
                    <Button small>Sign Up</Button>
                </ul>
            </div>

            <div className="bg-nav absolute backdrop-blur z-0 left-0 top-0 right-0 bottom-0 "></div>
        </nav>
    );
};

export default Nav;
