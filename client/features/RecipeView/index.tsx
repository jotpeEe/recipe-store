import React, { type FC, useCallback, useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import router from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    type GetRecipeByIdQuery,
    type IngredientInput,
    type InputMaybe,
    type UpdateInput,
    useUpdateRecipeMutation,
} from '@generated/graphql';
import { useKeyPress, useOnClickOutside } from '@hooks';
import { type RecipeProps } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import Recipe from './Recipe';

const recipeInfoSchema = z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z
        .string()
        .min(1, 'Description is required')
        .min(10, 'Must be at least 10 characters long'),
    prep: z.string().min(1, 'Prep time estimation is required').optional(),
    ingredients: z
        .object({
            name: z.string().optional(),
            amount: z.string().optional(),
        })
        .array()
        .optional(),
    steps: z
        .object({
            label: z.string().optional().nullable(),
            text: z.string().min(1, 'Step description required'),
        })
        .array()
        .optional(),
});

const checkIfEmpty = (ingredients: InputMaybe<IngredientInput[] | undefined>) =>
    ingredients?.filter(
        ing => !(ing.name.length === 0 || ing.amount.length === 0)
    );

const RecipeView: FC<RecipeProps> = props => {
    const recipeRef = useRef(null);
    const isEnterPressed = useKeyPress('Enter');
    const { id, title, prep, description, ingredients, steps } = props;

    const isClickedOutside = useOnClickOutside(recipeRef);

    const methods = useForm<UpdateInput>({
        defaultValues: {
            title,
            prep,
            description,
            ingredients,
            steps,
        },
        resolver: zodResolver(recipeInfoSchema),
    });

    const {
        handleSubmit,
        formState: { isDirty },
    } = methods;

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient, {
        onSuccess(data) {
            queryClient.setQueryData<GetRecipeByIdQuery>(
                ['GetRecipeById', { id }],
                () => ({
                    getRecipeById: {
                        ...data.updateRecipe,
                    },
                })
            );
        },
        onError(error: any) {
            if (error.response.errors[0].message === 'No access token found') {
                router.push('/auth');
            }
        },
    });

    const onSubmit: SubmitHandler<UpdateInput> = useCallback(
        values => {
            const filteredIngredients = checkIfEmpty(values.ingredients);
            const input = { ...values, ingredients: filteredIngredients };

            if (id) updateRecipe({ id, input });
        },
        [id, isDirty, isEnterPressed]
    );

    useEffect(() => {
        if (isDirty && (isEnterPressed || isClickedOutside)) {
            handleSubmit(onSubmit)();
        }
    }, [isEnterPressed, isDirty, isClickedOutside]);

    return (
        <div ref={recipeRef}>
            {props.withEdit ? (
                <FormProvider {...methods}>
                    <form>
                        <Recipe
                            {...props}
                            onSubmit={onSubmit}
                            isEnterPressed={isEnterPressed}
                            isClickedOutside={isClickedOutside}
                        />
                    </form>
                </FormProvider>
            ) : (
                <Recipe {...props} />
            )}
        </div>
    );
};

export default RecipeView;
