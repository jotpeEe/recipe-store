import { createContext, useContext } from 'react';

export const SliderContext = createContext<
    | {
          next: () => void;
          previous: () => void;
          goTo: (stepNumber: number) => void;
          step: number;
      }
    | undefined
>(undefined);

export const useSliderContext = () => {
    const context = useContext(SliderContext);

    if (!context) {
        throw new Error('useSlider must be used within a Slider');
    }
    return context;
};
