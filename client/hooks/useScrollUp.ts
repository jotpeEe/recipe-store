import { useEffect, useState } from 'react';

const useScrollUp = (offset?: number): boolean => {
    const NAV_HEIGHT = 100;
    const [scrollUp, setScrollUp] = useState(true);

    const offsetHight = offset || NAV_HEIGHT;

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScrollUp = () => {
            const { scrollY } = window;

            setScrollUp(scrollY <= lastScrollY || scrollY < offsetHight);
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
