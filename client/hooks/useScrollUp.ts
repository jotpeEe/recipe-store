import { useState, useEffect } from 'react';

const useScrollUp = () => {
    const [scrollUp, setScrollUp] = useState(true);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollUp = () => {
            const scrollY = window.pageYOffset;

            setScrollUp(scrollY <= lastScrollY || scrollY < 100);
            lastScrollY = scrollY;
            ticking = false;
        };

        const onScroll: () => void = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollUp);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return scrollUp;
};

export default useScrollUp;
