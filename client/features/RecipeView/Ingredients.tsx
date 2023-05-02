import React, { type FC, useMemo } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { AnimateOnLoad, IngredientInput } from '@components';
import { useRecipeContext } from '@contexts';
import { type UpdateInput } from '@generated/graphql';

import Ingredient from './Ingredient';

const Ingredients: FC = () => {
    const { control } = useFormContext<UpdateInput>();
    const { active, ingredients } = useRecipeContext();

    const { fields } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const slicedFields = useMemo(
        () => fields.slice(ingredients ? ingredients.length : 0),
        [ingredients, fields]
    );

    return (
        <>
            {ingredients?.length !== 0 && active === 0 && (
                <ul className="flex flex-col gap-4">
                    {ingredients?.map((ingredient, index) => {
                        if (
                            ingredient?.amount?.length !== 0 &&
                            ingredient?.name?.length !== 0
                        )
                            return (
                                <AnimateOnLoad
                                    as="li"
                                    key={index}
                                    index={index}
                                >
                                    <Ingredient
                                        {...{
                                            ...ingredient,
                                            id: index,
                                        }}
                                    />
                                </AnimateOnLoad>
                            );
                        return null;
                    })}
                </ul>
            )}
            {fields.length !== 0 && active === 0 && (
                <ul className="flex flex-col gap-4">
                    {slicedFields.map((item, index) => (
                        <AnimateOnLoad as="li" key={item.id} index={index}>
                            <IngredientInput index={index} item={item} />
                        </AnimateOnLoad>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Ingredients;
