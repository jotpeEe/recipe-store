import { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'yup';

import {
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
    CreateRecipeMutation,
} from '@generated/graphql';
import { useAppDispatch, useAppSelector } from '@hooks';
import { letters, numbers } from '@lib/regex';
import { type IRecipe } from '@lib/types';
import { setInfo, setId } from '@redux';
import { requestClient } from '@requests';

import Button from '../Button';
import FormInput from '../input/Form';
import ImageInput from '../input/Image';
import { useSlider } from '../slider';
import Panel from './Panel';

type OneProps = {
    defaultValues: Partial<IRecipe> | undefined;
};

const recipeInfoSchema = object({
    title: string().required().min(8),
    description: string()
        .required()
        .min(10, 'Must be at least 10 characters long'),
    prep: string().required().matches(numbers, 'Time must be a number'),
    cuisine: string()
        .required()
        .matches(letters, 'Cuisine must include only letters'),
    image: string(),
});

type RecipeInfoInput = TypeOf<typeof recipeInfoSchema>;

const StepOne: FC<OneProps> = ({ defaultValues }) => {
    const dispatch = useAppDispatch();
    const id = useAppSelector(state => state.recipe?.id);
    const { step, next } = useSlider();

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient);
    const { mutate: createRecipe } = useCreateRecipeMutation(requestClient, {
        onSuccess(data: CreateRecipeMutation) {
            dispatch(setId(data.createRecipe.recipe.id));
        },
    });

    const methods = useForm<RecipeInfoInput>({
        defaultValues,
        resolver: yupResolver(recipeInfoSchema),
    });
    const { handleSubmit, watch, reset } = methods;

    const title = watch('title');
    const description = watch('description');
    const prep = watch('prep');
    const cuisine = watch('cuisine');
    const image = watch('image');

    const recipe = {
        title,
        description,
        prep,
        cuisine,
        image,
    };

    useEffect(() => {
        if (step === 0) dispatch(setInfo(recipe));
    }, [recipe]);

    const onSubmit: SubmitHandler<
        RecipeInfoInput | Partial<IRecipe>
    > = values => {
        if (step === 0) {
            if (id) updateRecipe({ input: { ...values, step }, id });
            if (!id)
                createRecipe({
                    input: { ...values, step, temp: true } as IRecipe,
                });
        }

        reset();
        next();
        dispatch(setInfo({ ...values, step: step + 1 }));
    };

    return (
        <li>
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
                    <FormInput
                        label="Title"
                        name="title"
                        placeholder="Enter title"
                        type="text"
                    />
                    <FormInput
                        label="Description"
                        name="description"
                        placeholder="Enter description"
                        element="textarea"
                    />
                    <FormInput
                        label="Prep time"
                        name="prep"
                        placeholder="Enter prep time"
                        type="text"
                    />
                    <FormInput
                        label="Cuisine (ex. Thai, Polish)"
                        name="cuisine"
                        placeholder="Enter cuisine"
                    />
                    <ImageInput name="image" />
                    <Button className="my-7" type="submit" fullWidth arrow>
                        Next
                    </Button>
                </form>
            </FormProvider>
        </li>
    );
};

export default StepOne;
