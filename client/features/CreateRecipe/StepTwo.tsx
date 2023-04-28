import { type FC, type MouseEventHandler, useCallback, useMemo } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, ErrorMessage, Input } from '@components';
import { useCreateRecipe, useSliderContext } from '@contexts';
import { useUpdateRecipeMutation } from '@generated/graphql';
import { updateTempRecipeData } from '@lib';
import { requestClient } from '@requests';

import Panel from './Panel';
import { type RecipeInfoInput } from './RecipeForm';

const FormStepTwo: FC = () => {
    const { next, step } = useSliderContext();
    const { id, setStep } = useCreateRecipe();

    const {
        control,
        register,
        getValues,
        trigger,
        formState: { errors, isDirty },
    } = useFormContext<RecipeInfoInput>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient, {
        onSuccess(data) {
            updateTempRecipeData(data);
            next();
            setStep(2);
        },
    });

    const addField: MouseEventHandler<HTMLButtonElement> = useCallback(e => {
        e.preventDefault();
        append({ name: '', amount: '' });
    }, []);

    const removeField: MouseEventHandler<HTMLButtonElement> = useCallback(e => {
        e.preventDefault();
        remove(fields.length - 1);
    }, []);

    const ifErrors = useMemo(
        () => Object.entries(errors).length > 0,
        [errors.ingredients]
    );

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
        async e => {
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

    return (
        <div className="grid-col-panel grid w-full">
            <Panel />
            <h3 className="text-xl">Add Ingredients</h3>
            <p className="pb-4">
                Let’s add some ingredients <br />
                to the recipe.
            </p>
            <div className="flex justify-between pb-4">
                <Button onClick={addField} size="sm">
                    &#8675; add
                </Button>
                <Button onClick={removeField} size="sm" variant="outlined">
                    &#8673; remove
                </Button>
            </div>
            <ul className="w-fit">
                {fields.map((item, index) => (
                    <li key={item.id} className="grid grid-cols-6 gap-x-2 pb-2">
                        <Input
                            label={index === 0 ? 'Name' : ''}
                            className="col-span-4"
                            error={!!errors?.ingredients?.[index]?.name}
                            defaultValue={`${item.name}`}
                            {...register(`ingredients.${index}.name` as const)}
                            ref={null}
                            noValidation
                        />
                        <Input
                            label={index === 0 ? 'Amount' : ''}
                            className="col-span-2"
                            error={!!errors?.ingredients?.[index]?.amount}
                            defaultValue={`${item.amount}`}
                            {...register(
                                `ingredients.${index}.amount` as const
                            )}
                            ref={null}
                            noValidation
                        />
                    </li>
                ))}
            </ul>
            <ErrorMessage
                error={
                    ifErrors
                        ? { message: 'No empty fields required' }
                        : undefined
                }
            />
            <Button className="mt-3" fullWidth onClick={handleSubmit} arrow>
                Next
            </Button>
        </div>
    );
};

export default FormStepTwo;
