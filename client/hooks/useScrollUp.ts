import { useState, useEffect } from 'react';

const useScrollUp = (threshold = 0) => {
    const [scroll, setScroll] = useState<'up' | 'down' | 'idle'>('idle');

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        let ticking = false;

        const updateScrollUp = () => {
            const scrollY = window.pageYOffset;

            if (scrollY < lastScrollY || scrollY < threshold) setScroll('up');
            if (scrollY > lastScrollY) setScroll('down');
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

    return scroll;
};

export default useScrollUp;
