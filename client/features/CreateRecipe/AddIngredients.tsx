import React, { useCallback } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { IngredientInput } from '@components';
import { type RecipeInfoInput } from '@hooks';

import AddAndRemoveBar from './AddAndRemoveBar';

const AddIngredients = () => {
    const { control } = useFormContext<RecipeInfoInput>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const handleRemoveIngredient = useCallback(
        (index: number) => remove(index),
        []
    );

    const handleAddIngredient = useCallback(
        () => append({ name: '', amount: '' }),
        []
    );

    const handleRemoveLastIngredient = useCallback(
        () => remove(fields.length - 1),
        []
    );

    return (
        <>
            <AddAndRemoveBar
                handleAdd={handleAddIngredient}
                handleRemove={handleRemoveLastIngredient}
            />
            <ul className="flex w-fit flex-col gap-2">
                {fields.map((item, index) => (
                    <li key={item.id}>
                        <IngredientInput
                            index={index}
                            handleRemove={() => handleRemoveIngredient(index)}
                            defaultValues={fields?.[index]}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default AddIngredients;
