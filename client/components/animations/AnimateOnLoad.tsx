import {
    type FC,
    type PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from 'react';

import classNames from 'classnames';

type AnimateOnMountProps = PropsWithChildren & {
    index: number;
    as?: 'li' | 'div';
};

const AnimateOnMount: FC<AnimateOnMountProps> = ({
    index,
    children,
    as = 'div',
}) => {
    // set initial delay
    const [delay, setDelay] = useState(index * 100);
    const [active, setActive] = useState(false);

    const props = useMemo(
        () => ({
            className: classNames(
                'transition-all',
                active ? 'opacity-100' : 'translate-y-4 opacity-0'
            ),
            style: {
                transitionDelay: `${delay}ms`,
            },
        }),
        [active, delay]
    );

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
