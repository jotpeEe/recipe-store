import { type FC, useEffect, useMemo, useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { AnimateOnLoad, AnimatedDiv as Animated } from '@components/animations';
import { IngredientInput } from '@components/input';
import { useRecipeContext } from '@contexts';
import { type UpdateInput } from '@generated/graphql';
import { IconDish } from '@icons';

import ReviewList from '../ReviewList';
import Switch from '../Switch';
import Ingredient from './Ingredient';

const Display: FC = () => {
    const { id, step, ingredients, servings, steps, reviews, user } =
        useRecipeContext();

    const { control } = useFormContext<UpdateInput>();

    const { fields } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const slicedFields = useMemo(
        () => fields.slice(ingredients ? ingredients.length : 0),
        [ingredients, fields]
    );

    const [active, setActive] = useState(0);

    useEffect(() => {
        if (step === 2) setActive(1);
        if (step !== 2) setActive(0);
    }, [step]);

    const items = ingredients?.length;

    return (
        <>
            {(ingredients || steps) && (
                <>
                    <Animated className="col-span-3 flex h-fit justify-center">
                        <Switch
                            setActive={setActive}
                            active={active}
                            array={['Ingredients', 'Steps', 'Reviews']}
                            size="sm"
                            fullWidth
                        />
                    </Animated>
                    <div className="col-span-3 flex flex-col gap-4">
                        <div className="flex justify-between text-sm text-outlined">
                            <div className="flex items-center gap-1">
                                <IconDish />
                                {servings} serve
                            </div>
                            <div className="">
                                {items !== 1
                                    ? `${items} items`
                                    : `${items} item`}
                            </div>
                        </div>
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
                        {fields.length !== 0 &&
                            active === 0 &&
                            fields[0].name !== '' && (
                                <ul className="flex flex-col gap-4">
                                    {slicedFields.map((item, index) => (
                                        <AnimateOnLoad
                                            as="li"
                                            key={item.id}
                                            index={index}
                                        >
                                            <IngredientInput
                                                index={index}
                                                item={item}
                                            />
                                        </AnimateOnLoad>
                                    ))}
                                </ul>
                            )}
                        {steps &&
                            steps?.length !== 0 &&
                            active === 1 &&
                            steps.map(({ label, text }, index) => (
                                <AnimateOnLoad key={index} index={index}>
                                    <div className="rounded-xl bg-gray-200 p-4">
                                        {label && (
                                            <h6 className="pb-2">{label}</h6>
                                        )}
                                        <p
                                            className="max-w-[36ch] break-words text-sm text-gray-700"
                                            key={index}
                                            lang="pl"
                                        >
                                            {text}
                                        </p>
                                    </div>
                                </AnimateOnLoad>
                            ))}
                        {reviews && active === 2 && (
                            <ReviewList
                                addEnable
                                reviews={reviews}
                                id={id}
                                recipeAuthor={user}
                                fullWidth
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Display;
