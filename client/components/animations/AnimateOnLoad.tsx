import { FC, ReactNode, useEffect, useState } from 'react';

import classNames from 'classnames';

const AnimateOnLoad: FC<{ index: number; children: ReactNode }> = ({
    index,
    children,
}) => {
    const [delay, setDelay] = useState(index);
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
        setTimeout(() => setDelay(0), index * 100);
    }, []);

    return (
        <div
            className={classNames(
                `transition-all`,
                active ? 'opacity-100' : 'opacity-0 translate-y-4',
                delay === 1 && 'delay-100',
                delay === 2 && 'delay-200',
                delay === 3 && 'delay-300',
                delay === 4 && 'delay-400',
                delay === 5 && 'delay-500',
                delay === 6 && 'delay-600'
            )}
        >
            {children}
        </div>
    );
};

export default AnimateOnLoad;
