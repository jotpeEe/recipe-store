import {
    ReactNode,
    createContext,
    useState,
    useContext,
    useCallback,
    FC,
} from 'react';

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

const Slider: FC<SliderProps> = ({ children, controller, inside }) => {
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
                <ul className="flex p-1">
                    {children.map((child, index) => (
                        <li
                            key={index}
                            className="pl-1 shrink-0 pr-8 transition duration-300 ease"
                            style={{ transform: `translateX(-${step * 100}%)` }}
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

const useSlider = () => {
    const context = useContext(SliderContext);

    if (!context) {
        throw new Error('useSlider must be used within a Slider');
    }
    return context;
};

export { useSlider, Slider };
