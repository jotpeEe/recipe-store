import { useCallback, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateRecipe } from '@contexts';
import {
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
} from '@generated/graphql';
import { imageValidation, updateTempRecipeData } from '@lib';
import { requestClient } from '@requests';

const recipeInfoSchema = z
    .object({
        title: z.string().min(1, 'Title is required'),
        description: z
            .string()
            .min(1, 'Description is required')
            .min(10, 'Must be at least 10 characters long'),
        prep: z.string().min(1, 'Prep time estimation is required'),
        cuisine: z
            .string()
            .refine(value => value !== 'Choose', 'Cuisine is required'),
        image: z.any().superRefine((f, ctx) => imageValidation(f, ctx)),
        newCuisine: z.string().optional(),
        ingredients: z
            .object({
                name: z.string().min(1, 'Name is required'),
                amount: z.string().min(1, 'Amount is required'),
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
    })
    .superRefine(({ cuisine, newCuisine }, ctx) => {
        if (cuisine === 'Other' && !newCuisine) {
            ctx.addIssue({
                code: 'custom',
                message: 'Specify the type of cuisine',
                path: ['newCuisine'],
            });
        }
    });

export type RecipeInfoInput = z.TypeOf<typeof recipeInfoSchema>;

const useSubmit = () => {
    const router = useRouter();
    const { id, recipe } = useCreateRecipe();

    const methods = useForm<RecipeInfoInput>({
        mode: 'onChange',
        defaultValues: useMemo(() => recipe, [recipe]),
        resolver: zodResolver(recipeInfoSchema),
    });
    const { handleSubmit, reset } = methods;

    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient, {
        onSuccess({ deleteRecipe: data }) {
            updateTempRecipeData(data);

            /**
             * useFieldArray reset must be explicit
             *
             * @see https://react-hook-form.com/api/usefieldarray/#rules
             */
            reset({ ingredients: [], steps: [] });
        },
    });

    const { mutate: createRecipe, isLoading } = useCreateRecipeMutation(
        requestClient,
        {
            onSuccess() {
                if (id) deleteRecipe({ id });
                router.push('/profile');
            },
        }
    );

    /**
     *  It's recommended to reset form inside useEffect after submission.
     *
     * @see https://react-hook-form.com/api/useform/reset/#rules
     *  */
    useEffect(() => {
        reset(recipe);
    }, [recipe]);

    const onSubmit: SubmitHandler<RecipeInfoInput> = useCallback(input => {
        createRecipe({ input });
    }, []);

    return {
        handleSubmit: handleSubmit(onSubmit),
        isLoading,
        methods,
    };
};

export default useSubmit;
