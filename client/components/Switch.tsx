import { FC, MouseEvent, useCallback } from 'react';

import Button from '@components/Button';

type SwitchProps = {
    array: string[] | undefined;
    setActive: (index: number) => void;
    active: number;
    size?: 'sm' | 'md';
};

const Switch: FC<SwitchProps> = ({
    array,
    setActive,
    active,
    size = 'md',
}) => {
    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>, index: number) => {
            event.preventDefault();
            setActive(index);
        },
        []
    );

    return (
        <>
            {array &&
                array.map((children, index) => (
                    <Button
                        key={index}
                        fullWidth
                        size={size}
                        className="self-center justify-self-end"
                        outlined={index !== active}
                        onClick={event => handleClick(event, index)}
                    >
                        {children}
                    </Button>
                ))}
        </>
    );
};

export default Switch;
