import { FC } from 'react';

import classNames from 'classnames';

import { NavState } from '@lib/types';

const Hamburger: FC<NavState> = ({ open, setOpen }) => (
    <div
        className="sm:hidden flex items-center px-4 py-6 cursor-pointer transition"
        onClick={() => setOpen((prevState: boolean) => !prevState)}
    >
        <div
            className={classNames(
                'w-6 h-[2px] rounded-sm transition duration-200 ease-in-out',
                'before:absolute before:w-6 before:h-[2px] before:bg-black before:rounded-sm before:transition before:duration-200 before:ease-in-out',
                'after:absolute after:w-6 after:h-[2px] after:bg-black after:rounded-sm after:transition after:duration-200 after:ease-in-out',
                open ? '-translate-x-4 bg-transparent' : 'bg-black',
                open
                    ? ' before:-rotate-45 before:translate-x-4'
                    : 'before:-translate-y-2',
                open
                    ? ' after:rotate-45 after:translate-x-4'
                    : 'after:translate-y-2'
            )}
        ></div>
    </div>
);

export default Hamburger;
