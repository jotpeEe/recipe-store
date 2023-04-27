import { type FC, type MouseEventHandler, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

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

const stepSchema = z.object({
    step: z.string().min(1, 'Step is required'),
});

type StepInput = z.TypeOf<typeof stepSchema>;

const StepThree: FC = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.recipe);

    const { id, ...recipe } = data || {};

    const router = useRouter();

    const { mutate: createRecipe } = useCreateRecipeMutation(requestClient);
    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient);
    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient, {
        onSuccess() {
            dispatch(setRecipe({}));
            router.push('/profile');
        },
    });

    const methods = useForm<StepInput>({ resolver: zodResolver(stepSchema) });
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
        }, [id, recipe]);

    return (
        <li className="w-[260px] pl-1">
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
                        <TextArea
                            label="Description"
                            name="step"
                            placeholder="Enter step description"
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
