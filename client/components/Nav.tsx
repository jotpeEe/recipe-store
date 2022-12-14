import Image from 'next/image';
import Link from 'next/link';

import useScrollUp from '@hooks/useScrollUp';

import Button from './Button';

const Nav = () => {
    const scrollUp = useScrollUp();

    return (
        <nav
            className={`${
                !scrollUp ? '-translate-y-32' : ''
            } h-28 bg-transparent fixed top-0 lef-0 transition ease-in-out duration-200 w-full z-50`}
        >
            <div className="flex justify-between absolute left-0 right-0 bottom-0 top-0 items-center z-10 max-w-7xl mx-auto">
                <Link href="/">
                    <Image src="/logo.png" width={63} height={27} alt="logo" />
                </Link>
                <ul className="flex gap-8 items-center">
                    <li className="">
                        <Link href="/#recipes">
                            <h5>Recipes</h5>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/#reviews">
                            <h5>Reviews</h5>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="">
                            <h5>Log in</h5>
                        </Link>
                    </li>
                    <Button small>Sign Up</Button>
                </ul>
            </div>

            <div className="bg-nav absolute backdrop-blur z-0 left-0 top-0 right-0 bottom-0 "></div>
        </nav>
    );
};

export default Nav;
