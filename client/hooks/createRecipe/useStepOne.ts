import { type MouseEvent, useCallback } from 'react';

import { useFormContext } from 'react-hook-form';

import { useCreateRecipe, useSliderContext } from '@contexts';
import {
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} from '@generated/graphql';
import { updateTempRecipeData } from '@lib';
import { requestClient } from '@requests';

import { type RecipeInfoInput } from './useSubmit';

const useStepOne = () => {
    const { next, step } = useSliderContext();
    const { id, cuisines } = useCreateRecipe();

    const {
        watch,
        trigger,
        getValues,
        formState: { isDirty },
    } = useFormContext<RecipeInfoInput>();

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient, {
        onSuccess({ updateRecipe: data }) {
            updateTempRecipeData(data);
            next();
        },
    });
    const { mutate: createRecipe } = useCreateRecipeMutation(requestClient, {
        onSuccess({ createRecipe: data }) {
            updateTempRecipeData(data);
            next();
        },
    });

    const handleClick = useCallback(
        async (e: MouseEvent) => {
            e.preventDefault();

            const valid = await trigger([
                'title',
                'cuisine',
                'prep',
                'image',
                'description',
                'newCuisine',
            ]);

            const { newCuisine, cuisine, ...rest } = getValues();
            const input = {
                ...rest,
                cuisine: newCuisine || cuisine,
                temp: true,
            };

            if (valid) {
                if (id && isDirty) updateRecipe({ id, input });
                if (!id && isDirty) createRecipe({ input });
                if (!isDirty) next();
            }
        },
        [id, isDirty, step]
    );

    const cuisine = watch('cuisine');

    return {
        handleClick,
        cuisine,
        cuisines,
    };
};

export default useStepOne;
