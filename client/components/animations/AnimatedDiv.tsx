import { type FC, type ReactNode, useEffect, useState } from 'react';

import classNames from 'classnames';

type AnimatedProps = {
    children: ReactNode;
    className?: string;
};

const Animated: FC<AnimatedProps> = ({ children, className }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
    }, []);

    return (
        <div
            className={classNames(
                'origin-top transition duration-300 ease-in-out',
                active ? 'opacity-1' : 'opacity-0',
                className
            )}
        >
            {children}
        </div>
    );
};

export default Animated;
