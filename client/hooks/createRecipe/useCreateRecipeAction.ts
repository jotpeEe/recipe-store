import { type MouseEventHandler } from 'react';

import useStepOne from './useStepOne';
import useStepTwo from './useStepTwo';

type CreateRecipeActions = 'stepOne' | 'stepTwo';

type BaseReturn = {
    handleClick: MouseEventHandler<HTMLButtonElement>;
};

type StepTwoReturn = BaseReturn & {
    cuisine: string;
    cuisines: string[] | undefined;
};

type CreateRecipeActionFunction<T extends CreateRecipeActions> = {
    stepOne: () => StepTwoReturn;
    stepTwo: () => BaseReturn;
}[T];

type CreateRecipeReturnType<T extends CreateRecipeActions> = ReturnType<
    CreateRecipeActionFunction<T>
>;

const useCreateRecipeAction = <T extends CreateRecipeActions>(
    action: T
): CreateRecipeReturnType<T> =>
    ({
        stepOne: useStepOne() as CreateRecipeReturnType<T>,
        stepTwo: useStepTwo() as CreateRecipeReturnType<T>,
    }[action]);

export default useCreateRecipeAction;
