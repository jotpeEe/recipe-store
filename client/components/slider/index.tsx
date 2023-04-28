import {
    type FC,
    type ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react';

import cn from 'classnames';

import { SliderContext } from '@contexts';

import BreadCrumbs from './BreadCrumbs';
import SliderController from './Controller';

type SliderProps = {
    children: ReactNode[];
    breadcrumbs?: string[];
    className?: string;
    controller?: boolean;
    inside?: boolean;
};

const Slider: FC<SliderProps> = ({
    children,
    className,
    controller,
    inside,
    breadcrumbs,
}) => {
    const [step, setStep] = useState(0);
    const steps = children.length;

    const next = useCallback(() => {
        if (step < steps - 1) {
            setStep(prevStep => prevStep + 1);
        } else {
            setStep(0);
        }
    }, [step]);

    const previous = useCallback(() => {
        if (step > 0) {
            setStep(prevStep => prevStep - 1);
        } else {
            setStep(steps - 1);
        }
    }, [step]);

    const goTo = useCallback((stepNumber: number) => setStep(stepNumber), []);

    const controls = {
        goTo,
        next,
        previous,
        step,
    };

    useEffect(() => {
        setStep(0);
    }, [children.length]);

    return (
        <SliderContext.Provider value={controls}>
            <div className={cn('overflow-hidden', className)}>
                {breadcrumbs && <BreadCrumbs steps={breadcrumbs} />}
                <ul className="flex">
                    {children.map((child, index) => (
                        <li
                            key={index}
                            className="ease w-full shrink-0 pr-8 transition duration-300"
                            style={{
                                transform: `translateX(-${step * 100}%)`,
                            }}
                        >
                            {child}
                        </li>
                    ))}
                </ul>

                {controller && steps > 1 && (
                    <SliderController steps={steps} inside={inside} />
                )}
            </div>
        </SliderContext.Provider>
    );
};

export default Slider;
