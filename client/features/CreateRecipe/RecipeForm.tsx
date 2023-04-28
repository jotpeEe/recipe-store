import { type FC, useCallback, useEffect, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { dehydrate } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Slider } from '@components';
import { CreateRecipeContext } from '@contexts';
import {
    type GetTempRecipeQuery,
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
} from '@generated/graphql';
import { imageValidation } from '@lib';
import { queryClient, requestClient } from '@requests';

import Preview from './Preview';
import FormStepOne from './StepOne';
import FormStepThree from './StepThree';
import FormStepTwo from './StepTwo';

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

type RecipeFormProps = {
    cuisines: string[] | undefined;
    recipe: RecipeInfoInput | undefined;
    id: string | undefined;
};

/**
 * CreateRecipe feature with {@link https://react-hook-form.com/ | react-hook-form} form provider
 * and {@link CreateRecipeContext}.
 *
 * @param cuisines Gets the list of all cuisines from stored recipes.
 * @param recipe Gets recipe form state from the server.
 * @param id If exists update saved recipe, otherwise create a new one.
 *
 * */
const RecipeForm: FC<RecipeFormProps> = ({ cuisines, recipe, id }) => {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const methods = useForm<RecipeInfoInput>({
        mode: 'onChange',
        defaultValues: useMemo(() => recipe, [recipe]),
        resolver: zodResolver(recipeInfoSchema),
    });
    const { handleSubmit, reset } = methods;

    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient, {
        onSuccess() {
            queryClient.setQueryData<GetTempRecipeQuery>(
                ['GetTempRecipe', {}],
                old => ({
                    ...old,
                    temp: {
                        status: `${old?.temp?.status}`,
                        recipe: undefined,
                    },
                })
            );

            /**
             * useFieldArray reset must be explicit
             *
             * @see https://react-hook-form.com/api/usefieldarray/#rules
             */
            reset({ ingredients: [], steps: [] });
        },
    });

    const { mutate: createRecipe, isLoading: isSubmitting } =
        useCreateRecipeMutation(requestClient, {
            onSuccess() {
                if (id) deleteRecipe({ id });
                router.push('/profile');
            },
        });

    const resetForm = useCallback(() => {
        if (id) deleteRecipe({ id });
        reset();
    }, [id, recipe]);

    const context = {
        id,
        step,
        setStep,
        cuisines,
        resetForm,
        isSubmitting,
    };

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

    return (
        <CreateRecipeContext.Provider value={context}>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto flex max-w-7xl gap-10 pt-24"
                >
                    <Slider
                        className="max-w-[300px]"
                        breadcrumbs={[
                            'Add info',
                            'Add ingredients',
                            'Add steps',
                        ]}
                    >
                        <FormStepOne />
                        <FormStepTwo />
                        <FormStepThree />
                    </Slider>
                    <Preview />
                </form>
            </FormProvider>
        </CreateRecipeContext.Provider>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (!req.cookies.access_token)
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };

    return {
        props: {
            create: true,
            dehydratedState: dehydrate(queryClient),
            requireAuth: true,
            enableAuth: !!req.cookies.refresh_token,
        },
    };
};

export default RecipeForm;
