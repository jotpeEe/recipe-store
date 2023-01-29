import { FC, MouseEventHandler, useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'yup';

import { useUpdateRecipeMutation } from '@generated/graphql';
import { useAppDispatch, useAppSelector } from '@hooks';
import { letters, lettersAndNumbers } from '@lib/regex';
import { addIngredient, setInfo } from '@redux';
import { requestClient } from '@requests';

import Button from '../Button';
import FormInput from '../input/Form';
import { useSlider } from '../slider';
import Panel from './Panel';

const ingredientSchema = object({
    name: string()
        .required('Name is required')
        .matches(letters, 'Name must include only letters'),
    amount: string()
        .required('Amount is required')
        .matches(lettersAndNumbers, 'Must include only letters or numbers'),
});

type IngredientInput = TypeOf<typeof ingredientSchema>;

const StepTwo: FC = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.recipe);

    const { id, ...recipe } = data ?? {};
    const { step, next } = useSlider();

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient);

    const methods = useForm<IngredientInput>({
        resolver: yupResolver(ingredientSchema),
    });
    const { handleSubmit, reset } = methods;

    const onSubmit: SubmitHandler<IngredientInput> = useCallback(
        values => {
            dispatch(addIngredient(values));
            const { name, amount } = values;

            if (id && amount && name) {
                if (!recipe.ingredients) {
                    updateRecipe({
                        input: { ingredients: [{ amount, name }], step },
                        id,
                    });
                } else {
                    updateRecipe({
                        input: {
                            ingredients: [
                                ...recipe.ingredients,
                                { amount, name },
                            ],
                            step,
                        },
                        id,
                    });
                }
            }

            reset();
        },
        [id, recipe.ingredients, step]
    );

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        e => {
            e.preventDefault();
            dispatch(setInfo({ step: step + 1 }));
            next();
        },
        [step]
    );

    return (
        <li>
            <FormProvider {...methods}>
                <form
                    className="relative"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Panel />
                    <h3 className="text-xl">Add Ingredients</h3>
                    <p className="pb-4">
                        Let’s add some ingredients <br />
                        to the recipe.
                    </p>
                    <div className="[&>button:last-of-type]:mt-24 [&>button]:mb-4">
                        <FormInput
                            label="Name"
                            name="name"
                            placeholder="Enter name"
                            type="text"
                        />
                        <FormInput
                            label="Amount"
                            name="amount"
                            placeholder="Enter amount"
                            type="text"
                        />
                        <Button type="submit" size="sm">
                            add
                        </Button>
                        <Button fullWidth onClick={handleClick} arrow>
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </li>
    );
};

export default StepTwo;
