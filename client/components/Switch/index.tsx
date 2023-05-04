import { type FC, type MouseEvent, useCallback } from 'react';

import classNames from 'classnames';

import Button from '../Button';

type SwitchProps = {
    array: string[] | undefined;
    setActive: (index: number) => void;
    active: number;
    size?: 'sm' | 'md';
    fullWidth?: boolean;
};

const Switch: FC<SwitchProps> = ({
    array,
    setActive,
    active,
    size = 'md',
    fullWidth,
}) => {
    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>, index: number) => {
            event.preventDefault();
            setActive(index);
        },
        []
    );

    return (
        <ul
            className={classNames(
                'flex gap-2 rounded-2xl p-1',
                active === 0 && 'bg-gradient-to-r from-emerald-50 to-slate-50',
                active === 1 && 'bg-emerald-50',
                active === 2 && 'bg-gradient-to-l from-emerald-50 to-slate-50',
                fullWidth && 'w-full'
            )}
        >
            {array &&
                array.map((children, index) => (
                    <li key={index} className="w-full">
                        <Button
                            key={index}
                            fullWidth
                            size={size}
                            className="self-center justify-self-end"
                            variant={index !== active ? 'pure' : 'normal'}
                            onClick={event => handleClick(event, index)}
                        >
                            {children}
                        </Button>
                    </li>
                ))}
        </ul>
    );
};

export default Switch;
