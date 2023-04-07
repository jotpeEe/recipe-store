import { type FC, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ImageInput, Input, Select, TextArea } from '@components';
import { useSliderContext } from '@contexts';
import {
    type CreateRecipeMutation,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} from '@generated/graphql';
import { useAppDispatch, useAppSelector } from '@hooks';
import { imageValidation, letters } from '@lib';
import { type IRecipe } from '@lib/types';
import { setId, setInfo } from '@redux';
import { queryClient, requestClient } from '@requests';

import Panel from './Panel';

type StepOneProps = {
    defaultValues?: Partial<IRecipe>;
    cuisines?: string[];
};

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
        newCuisine: z
            .any()
            .refine(
                value => letters.test(value),
                'Cuisine must include only letters'
            ),
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

type RecipeInfoInput = z.TypeOf<typeof recipeInfoSchema>;

const StepOne: FC<StepOneProps> = ({ defaultValues, cuisines }) => {
    const dispatch = useAppDispatch();
    const id = useAppSelector(state => state.recipe?.id);
    const initialRecipe = useAppSelector(state => state.recipe);
    const { step, next } = useSliderContext();

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient);
    const { mutate: createRecipe } = useCreateRecipeMutation(requestClient, {
        onSuccess(data: CreateRecipeMutation) {
            queryClient.refetchQueries('GetTempRecipe');
            dispatch(setId(data.createRecipe.recipe.id));
        },
    });

    const methods = useForm<RecipeInfoInput>({
        defaultValues,
        resolver: zodResolver(recipeInfoSchema),
    });
    const { handleSubmit, watch, reset } = methods;

    const title = watch('title');
    const description = watch('description');
    const prep = watch('prep');
    const select = watch('cuisine');
    const newCuisine = watch('newCuisine');
    const image = watch('image');

    const cuisine = useMemo(
        () =>
            newCuisine
                ? newCuisine
                      ?.slice(0, 1)
                      .toUpperCase()
                      .concat(newCuisine.slice(1, newCuisine.length))
                : select
                      ?.slice(0, 1)
                      .toUpperCase()
                      .concat(select.slice(1, select.length)),
        [newCuisine, select]
    );

    const recipe = useMemo(
        () => ({
            title,
            description,
            prep,
            cuisine,
            image,
        }),
        [title, description, prep, cuisine, image]
    );

    useEffect(() => {
        if (step === 0) dispatch(setInfo(recipe));
        if (initialRecipe) {
            const size = Object.keys(initialRecipe).length;
            if (size === 0 || size === 1) reset();
        }
    }, [recipe, defaultValues]);

    const onSubmit: SubmitHandler<RecipeInfoInput> = async values => {
        const { newCuisine: smthg, ...rest } = values;

        const input = {
            ...rest,
            cuisine,
            step,
        };

        if (step === 0) {
            if (id) {
                updateRecipe({
                    input,
                    id,
                });
            } else {
                createRecipe({
                    input: {
                        ...input,
                        temp: true,
                    } as IRecipe,
                });
            }
            next();
            dispatch(setInfo({ ...values, cuisine, step: step + 1 }));
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <form
                    className="relative"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Panel first />
                    <h3 className="text-xl">Create a recipe</h3>
                    <p className="pb-4">
                        Let’s setup default informations <br />
                        about the recipe.
                    </p>
                    <Input
                        label="Title"
                        name="title"
                        placeholder="Enter title"
                        type="text"
                    />
                    <Select
                        label="Cuisine (ex. Thai, Polish)"
                        name="cuisine"
                        options={cuisines ?? ['']}
                        placeholder="Enter cuisine"
                    />
                    {select === 'Other' && (
                        <Input name="newCuisine" placeholder="Enter cuisine" />
                    )}
                    <Input
                        label="Prep time"
                        name="prep"
                        placeholder="ex. 35 min"
                        type="number"
                    />
                    <TextArea
                        label="Description"
                        name="description"
                        placeholder="Enter description"
                    />
                    <ImageInput name="image" instantUpload />
                    <Button className="my-7" type="submit" fullWidth arrow>
                        Next
                    </Button>
                </form>
            </FormProvider>
        </>
    );
};

export default StepOne;
