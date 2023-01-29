import {
    FC,
    createContext,
    useMemo,
    useState,
    SetStateAction,
    Dispatch,
} from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { useScrollUp } from '@hooks';

import Hamburger from './Hamburger';
import Navigation from './Navigation';

type NavProps = {
    isLoading: boolean;
};

const NavContext = createContext<
    { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> } | undefined
>(undefined);

const Nav: FC<NavProps> = ({ isLoading }) => {
    const [open, setOpen] = useState(false);
    const NAV_HEIGHT = 100;
    const scroll = useScrollUp(NAV_HEIGHT);

    const state = useMemo(
        () => ({
            open,
            setOpen,
        }),
        [open]
    );

    return (
        <NavContext.Provider value={state}>
            {!isLoading && (
                <header
                    className={classNames(
                        'fixed top-0 lef-0 transition ease-in-out duration-200 w-full z-[100]',
                        scroll === 'down' && !open && '-translate-y-full',
                        open ? 'bg-white h-screen' : 'bg-transparent h-20'
                    )}
                >
                    <div className="flex h-20 justify-between absolute left-0  md:px-12 px-6 right-0 bottom-0 top-0 items-center z-10 max-w-7xl mx-auto">
                        <Link href="/" onClick={() => setOpen(false)}>
                            <Image
                                src="/logo.png"
                                width={63}
                                height={27}
                                alt="logo"
                            />
                        </Link>

                        <Navigation {...state} />
                        <Hamburger {...state} />
                    </div>

                    <div className="bg-nav absolute backdrop-blur z-0 left-0 top-0 right-0 bottom-0 "></div>
                </header>
            )}
        </NavContext.Provider>
    );
};

export default Nav;
