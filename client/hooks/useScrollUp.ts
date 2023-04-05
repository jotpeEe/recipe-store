import { useEffect, useState } from 'react';

const useScrollUp = () => {
    const NAV_HEIGHT = 100;
    const [scrollUp, setScrollUp] = useState(true);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollUp = () => {
            const scrollY = window.pageYOffset;

            setScrollUp(scrollY <= lastScrollY || scrollY < NAV_HEIGHT);
            lastScrollY = scrollY;
            ticking = false;
        };

        const onScroll = () => {
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
