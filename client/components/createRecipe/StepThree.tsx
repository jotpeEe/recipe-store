import { type FC, type MouseEventHandler, useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { type TypeOf, object, string } from 'yup';

import { Button, TextArea } from '@components';
import {
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation,
} from '@generated/graphql';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { IRecipe } from '@lib/types';
import { addStep, setRecipe } from '@redux';
import { requestClient } from '@requests';

import Panel from './Panel';

const stepSchema = object({
    step: string()
        .required('Step is required')
        .min(10, 'Must be at least 10 characters long'),
});

type StepInput = TypeOf<typeof stepSchema>;

const StepThree: FC = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.recipe);

    const { id, ...recipe } = data || {};

    const router = useRouter();

    const { mutate: createRecipe } = useCreateRecipeMutation(requestClient);
    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient);
    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient);

    const methods = useForm<StepInput>({ resolver: yupResolver(stepSchema) });
    const { reset, handleSubmit } = methods;

    const onSubmit: SubmitHandler<StepInput> = useCallback(
        values => {
            const { step } = values;
            dispatch(addStep(step));

            if (id && step) {
                if (!recipe?.steps) {
                    updateRecipe({
                        input: { ...recipe, steps: [step] },
                        id,
                    });
                } else {
                    updateRecipe({
                        input: { ...recipe, steps: [...recipe.steps, step] },
                        id,
                    });
                }
            }

            reset();
        },
        [id, recipe.steps]
    );

    const handleClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            if (id) {
                const { temp, step, ...pureRecipe } = recipe;
                createRecipe({ input: { ...pureRecipe } as IRecipe });
                deleteRecipe({ id });
            }

            dispatch(setRecipe({}));

            router.push('/profile');
        }, [id, recipe]);

    return (
        <li>
            <FormProvider {...methods}>
                <form
                    className="relative"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Panel />
                    <h3 className="text-xl">Add steps</h3>
                    <p className="pb-4">
                        Let’s add some steps <br />
                        to the recipe.
                    </p>
                    <div className="[&>button:last-of-type]:mt-24 [&>button]:mb-4">
                        <FormInput
                            element="textarea"
                            label="Description"
                            name="step"
                            placeholder="Enter step description"
                            type="text"
                        />
                        <Button type="submit" size="sm">
                            add
                        </Button>

                        <Button type="button" onClick={handleClick} fullWidth>
                            Create recipe
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </li>
    );
};

export default StepThree;
