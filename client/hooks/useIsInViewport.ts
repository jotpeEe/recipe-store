import { type RefObject, useEffect, useState } from 'react';

const useIsInViewport = (
    ref: RefObject<Element>,
    options?: IntersectionObserverInit,
    once?: boolean
) => {
    const [isInViewport, setIsInViewport] = useState(false);

    const handleRecipesListIntersection = (
        entries: IntersectionObserverEntry[]
    ) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            handleRecipesListIntersection,
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current && !once) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return isInViewport;
};

export default useIsInViewport;
