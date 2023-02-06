import { FC, ReactNode, useEffect, useState } from 'react';

import classNames from 'classnames';

const AnimateOnLoad: FC<{ index: number; children: ReactNode }> = ({
    index,
    children,
}) => {
    // set initial delay
    const [delay, setDelay] = useState(index * 100);
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);

        // clear delay after first load for other interactive transitions on a client
        setTimeout(() => setDelay(0), index * 100);
    }, []);

    return (
        <div
            className={classNames(
                'transition-all',
                active ? 'opacity-100' : 'opacity-0 translate-y-4'
            )}
            style={{
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default AnimateOnLoad;
