import {
    ReactNode,
    createContext,
    useState,
    useContext,
    useCallback,
} from 'react';

import classNames from 'classnames';

// eslint-disable-next-line import/no-cycle
import SliderController from './Controller';

type SliderProps = {
    children: ReactNode[];
    controller?: boolean;
    inside?: boolean;
};

const SliderContext = createContext<
    | {
          next: () => void;
          previous: () => void;
          goTo: (stepNumber: number) => void;
          step: number;
      }
    | undefined
>(undefined);

const Slider = ({ children, controller, inside }: SliderProps) => {
    const [step, setStep] = useState<number>(0);
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

    return (
        <SliderContext.Provider value={controls}>
            <div className="overflow-hidden">
                <div className="">
                    <ul
                        className={classNames(
                            'flex p-1 children:shrink-0 children:pr-8 children:transition children:duration-300 children:ease',
                            step === 1 && '[&>*]:-translate-x-space1',
                            step === 2 && '[&>*]:-translate-x-space2',
                            step === 3 && '[&>*]:-translate-x-space3',
                            step === 4 && '[&>*]:-translate-x-space4',
                            step === 5 && '[&>*]:-translate-x-space5',
                            step === 6 && '[&>*]:-translate-x-space6',
                            step === 7 && '[&>*]:-translate-x-space7',
                            step === 8 && '[&>*]:-translate-x-space8',
                            step === 9 && '[&>*]:-translate-x-space9',
                            step === 10 && '[&>*]:-translate-x-space10',
                            step === 11 && '[&>*]:-translate-x-space11'
                        )}
                    >
                        {children}
                    </ul>
                </div>
                {controller && steps > 4 && (
                    <SliderController steps={steps} inside={inside} />
                )}
            </div>
        </SliderContext.Provider>
    );
};

const useSlider = () => {
    const context = useContext(SliderContext);

    if (!context) {
        throw new Error('useSlider must be used within a Slider');
    }
    return context;
};

export { useSlider, Slider };
