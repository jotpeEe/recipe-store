import { type MouseEvent, useCallback } from 'react';

import { useFormContext } from 'react-hook-form';

import { useCreateRecipe, useSliderContext } from '@contexts';
import { type UpdateInput, useUpdateRecipeMutation } from '@generated/graphql';
import { updateTempRecipeData } from '@lib';
import { requestClient } from '@requests';

import { type RecipeInfoInput } from './useSubmit';

const useStepTwo = () => {
    const { next, step } = useSliderContext();
    const { id, setStep } = useCreateRecipe();

    const {
        getValues,
        trigger,
        formState: { isDirty },
    } = useFormContext<RecipeInfoInput>();

    const { mutate: updateRecipe } = useUpdateRecipeMutation<UpdateInput>(
        requestClient,
        {
            onSuccess({ updateRecipe: data }) {
                updateTempRecipeData(data);
                next();
                setStep(2);
            },
        }
    );

    const handleClick = useCallback(
        async (e: MouseEvent) => {
            e.preventDefault();

            const valid = await trigger('ingredients');
            const { ingredients } = getValues();
            const input = { ingredients, step: 1 };

            if (valid) {
                if (id && isDirty) updateRecipe({ id, input });
                if (!isDirty) {
                    next();
                    setStep(2);
                }
            }
        },
        [id, isDirty, step]
    );

    return {
        handleClick,
    };
};

export default useStepTwo;
