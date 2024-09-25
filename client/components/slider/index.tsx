import {
    type FC,
    type ReactNode,
    type RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import cn from 'classnames';

import { SliderContext } from '@contexts';

import BreadCrumbs from './BreadCrumbs';
import SliderController from './Controller';

type SliderProps = {
    breadcrumbs?: string[];
    children?: ReactNode[] | undefined;
    className?: string;
    controller?: boolean;
    fullWidth?: boolean;
    minItemWidth?: number;
    config?: {
        fullWidth?: true;
        listeners?: boolean;
    };
};

export type SliderControl = {
    step: number;
    goTo: (stepNumber: number) => void;
    next: () => void;
    previous: () => void;
};

const useSliderController = (sliderItems: ReactNode[][]): SliderControl => {
    const [step, setStep] = useState(0);

    const goTo = useCallback((stepNumber: number) => setStep(stepNumber), []);

    const next = useCallback(
        () =>
            step < sliderItems.length - 1
                ? setStep(prevStep => prevStep + 1)
                : setStep(0),

        [step, sliderItems]
    );

    const previous = useCallback(
        () =>
            step > 0
                ? setStep(prevStep => prevStep - 1)
                : setStep(sliderItems.length - 1),
        [step, sliderItems]
    );

    return {
        step,
        goTo,
        next,
        previous,
    };
};

const useSliderHandlers = (
    sliderRef: RefObject<HTMLUListElement | null>,
    context: Pick<SliderControl, 'next' | 'previous'>,
    listeners?: boolean
) => {
    const DEBOUNCE_TIME = 250;
    const TOUCH_TRESHOLD = 50;
    const touchRef = useRef<number | null>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { next, previous } = context;

    const debounceTouch = useCallback((action: () => void, time?: number) => {
        if (debounceTimeoutRef.current === null) {
            action();
            debounceTimeoutRef.current = setTimeout(() => {
                debounceTimeoutRef.current = null;
            }, time || 500);
        }
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchRef.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (touchRef.current === null) return;
            if (!listeners) return;

            const touchX = e.touches[0].clientX;
            const diff = touchX - touchRef.current;

            if (diff < -TOUCH_TRESHOLD) {
                debounceTouch(next);
            } else if (diff > TOUCH_TRESHOLD) {
                debounceTouch(previous);
            }
        },
        [touchRef.current, debounceTouch, next, previous]
    );

    const handleTouchEnd = useCallback(() => {
        touchRef.current = null;

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
        }
    }, []);

    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            if (listeners) {
                if (e.deltaY < 0) debounceTouch(previous, DEBOUNCE_TIME);
                if (e.deltaY > 0) debounceTouch(next, DEBOUNCE_TIME);
            }
        },
        [debounceTouch, next, previous]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) =>
            ({
                ArrowLeft: () => previous(),
                ArrowRight: () => next(),
            }[e.key]),
        [next, previous]
    );

    useEffect(() => {
        const handleScrollEvents = (event: WheelEvent | TouchEvent) => {
            if (sliderRef?.current?.contains(event.target as Node)) {
                event.preventDefault();
            }
        };

        const options = { passive: false };

        if (listeners) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('touchmove', handleScrollEvents, options);
            document.addEventListener('wheel', handleScrollEvents, options);
        }

        return () => {
            if (listeners) {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('touchmove', handleScrollEvents);
                document.removeEventListener('wheel', handleScrollEvents);
            }
        };
    }, [handleKeyDown, listeners]);

    return {
        handleTouchStart,
        handleTouchEnd,
        handleTouchMove,
        handleWheel,
        handleKeyDown,
    };
};

const Slider: FC<SliderProps> = ({
    breadcrumbs,
    children = [],
    className,
    controller,
    fullWidth,
    minItemWidth = 1_280,
    config,
}) => {
    const sliderItemsRef = useRef<HTMLLIElement[]>([]);
    const sliderRef = useRef<HTMLUListElement | null>(null);

    const [itemsPerSlide, setItemsPerSlide] = useState(1);
    const [slidesWidth, setSlidesWidth] = useState<number[]>([]);
    const steps = Math.ceil(children.length / itemsPerSlide);

    const { listeners } = config || {};

    const sliderItems = useMemo(
        () =>
            children.reduce((acc: React.ReactNode[][], child, index) => {
                const chunkIndex = Math.floor(index / itemsPerSlide);

                if (!acc[chunkIndex]) acc[chunkIndex] = [];

                acc[chunkIndex].push(child);

                return acc;
            }, []),
        [children, itemsPerSlide]
    );

    const context = useSliderController(sliderItems);
    const { goTo, step, next, previous } = context;

    const { handleTouchEnd, handleTouchMove, handleTouchStart, handleWheel } =
        useSliderHandlers(sliderRef, { next, previous }, listeners);

    const translateWidth = useMemo(() => {
        const slides = sliderItemsRef.current.map(child => child?.offsetWidth);

        const sum = slides
            .slice(0, step)
            .reduce((acc, temp) => (temp ? acc + temp : acc), 0);

        return sum;
    }, [step, sliderItemsRef.current, itemsPerSlide, steps]);

    useEffect(() => {
        const calculateSlidesWidth = () => {
            if (sliderItemsRef.current.length > 0) {
                const newSlidesWidth = sliderItemsRef.current.map(
                    child => child?.offsetWidth || 0
                );
                setSlidesWidth(newSlidesWidth);
            }
        };

        calculateSlidesWidth();

        if (!listeners) return () => {};

        const element = sliderRef.current;

        const handleResize = () => {
            if (element && minItemWidth) {
                const elementWidth = element.offsetWidth;

                const maxItemsPerSlide = Math.floor(
                    (elementWidth > minItemWidth
                        ? elementWidth
                        : minItemWidth) / minItemWidth
                );
                setItemsPerSlide(maxItemsPerSlide);

                // go to first slide, to reset transition width
                goTo(0);
            }
        };

        // resize on first render
        if (minItemWidth !== 1280) handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sliderRef.current, minItemWidth, listeners, children, goTo]);

    return (
        <SliderContext.Provider value={context}>
            <div
                className={cn(
                    'overflow-hidden',
                    controller && 'flex flex-col gap-5 border-gray-300',
                    className
                )}
            >
                <BreadCrumbs steps={breadcrumbs} />
                {controller && <SliderController steps={steps} />}
                <ul
                    ref={sliderRef}
                    className="flex transition duration-300"
                    style={{
                        transform: `translateX(-${translateWidth}px)`,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onWheel={handleWheel}
                >
                    {sliderItems.map((child, index) => (
                        <li
                            key={index}
                            ref={slideRef => {
                                if (sliderRef !== null) {
                                    sliderItemsRef.current[index] =
                                        slideRef as HTMLLIElement;
                                }
                            }}
                            aria-hidden={index !== step}
                            className={cn(
                                'ease relative grid shrink-0 gap-4 pb-1 pr-1',
                                fullWidth || itemsPerSlide > 1
                                    ? 'w-full'
                                    : 'w-fit'
                            )}
                            style={{
                                gridTemplateColumns: `repeat(${
                                    child.length
                                }, minmax(150px, ${
                                    slidesWidth[index] / itemsPerSlide
                                }px)`,
                            }}
                        >
                            {child}
                        </li>
                    ))}
                </ul>
            </div>
        </SliderContext.Provider>
    );
};

export default Slider;
