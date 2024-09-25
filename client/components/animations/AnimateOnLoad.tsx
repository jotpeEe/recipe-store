import {
    type PropsWithChildren,
    createElement,
    useEffect,
    useMemo,
    useState,
} from 'react';

import classNames from 'classnames';

type AnimateOnMountProps<E extends keyof JSX.IntrinsicElements> =
    PropsWithChildren<{
        index: number;
        as?: E;
        className?: string;
    }>;

const AnimateOnMount = <E extends keyof JSX.IntrinsicElements>({
    index,
    className,
    children,
    as,
}: AnimateOnMountProps<E>) => {
    const [delay, setDelay] = useState(index * 100);
    const [active, setActive] = useState(false);

    const props = useMemo(
        () => ({
            className: classNames(
                'transition-all',
                active ? 'opacity-100' : 'translate-y-4 opacity-0',
                className
            ),
            style: {
                transitionDelay: `${delay}ms`,
            },
        }),
        [active, delay]
    );

    useEffect(() => {
        setActive(true);

        setTimeout(() => setDelay(0), index * 100);
    }, []);

    if (as) return createElement(as, props, children);
    return null;
};

export default AnimateOnMount;
