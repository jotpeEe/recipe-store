import { type FC, type MouseEvent, useEffect, useState } from 'react';

import cn from 'classnames';

import AlignTop from './icons/AlignTop';

type ScrollToTopProps = {
    threshold?: number;
    showUnder?: number;
};

const ScrollToTop: FC<ScrollToTopProps> = ({
    threshold = 800,
    showUnder = 0,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const scrollToTop = (duration: number) => {
            const startPosition = window.pageYOffset;
            const distance = -window.pageYOffset;
            let startTime: number | null = null;

            const easeOutQuart = (
                t: number,
                b: number,
                c: number,
                d: number
            ): number => {
                const time = t / d;
                const easedTime = time - 1;
                return (
                    -c * (easedTime * easedTime * easedTime * easedTime - 1) + b
                );
            };

            const animation = (currentTime: number) => {
                if (startTime === null) {
                    startTime = currentTime;
                }

                const timeElapsed = currentTime - startTime;
                const scrollY = easeOutQuart(
                    timeElapsed,
                    startPosition,
                    distance,
                    duration
                );

                window.scrollTo(0, scrollY);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        };

        scrollToTop(300);
    };

    return (
        <button
            className={cn(
                'fixed bottom-8 right-8 rounded-full bg-gray-800 p-3 text-white transition-all duration-500 ease-out',
                isVisible && window.scrollY > showUnder
                    ? 'opacity-100'
                    : 'translate-y-52 opacity-0'
            )}
            onClick={handleClick}
        >
            <AlignTop height={36} width={36} strokeWidth={2} />
        </button>
    );
};

export default ScrollToTop;
