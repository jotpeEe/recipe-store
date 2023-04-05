import { type FC, useEffect, useMemo, useState } from 'react';

import { type FieldArrayWithId } from 'react-hook-form';

import { AnimateOnLoad, AnimatedDiv as Animated } from '@components/animations';
import { IngredientInput } from '@components/input';
import { useRecipeContext } from '@contexts';
import { type UpdateInput } from '@generated/graphql';
import { IconDish } from '@icons';

import ReviewList from '../ReviewList';
import Switch from '../Switch';
import Ingredient from './Ingredient';

type DisplayProps = {
    fields: FieldArrayWithId<UpdateInput, 'ingredients', 'id'>[];
};

const Display: FC<DisplayProps> = ({ fields }) => {
    const { id, step, ingredients, servings, steps, reviews, user } =
        useRecipeContext();

    const slicedFields = useMemo(
        () => fields.slice(ingredients ? ingredients.length : 0),
        [ingredients, fields]
    );

    const [active, setActive] = useState<number>(0);

    useEffect(() => {
        if (step === 2) setActive(1);
        if (step !== 2) setActive(0);
    }, [step]);

    const items = ingredients?.length;

    const buttons = ['Ingredients', 'Steps', 'Reviews'];

    return (
        <>
            {(ingredients || steps) && (
                <Animated className="col-span-3 h-fit flex justify-center">
                    <Switch
                        setActive={setActive}
                        active={active}
                        array={buttons}
                        size="sm"
                    />
                </Animated>
            )}
            {(ingredients || steps) && (
                <div className="col-span-3 flex flex-col gap-4">
                    <div className="flex justify-between text-outlined">
                        <div className="">{servings} serve</div>
                        <div className="">
                            {items !== 1 ? `${items} items` : `${items} item`}
                        </div>
                    </div>
                    {ingredients &&
                        active === 0 &&
                        ingredients?.map((ingredient, index) => (
                            <AnimateOnLoad key={index} index={index}>
                                <Ingredient {...{ ...ingredient, id: index }} />
                            </AnimateOnLoad>
                        ))}
                    {steps &&
                        active === 1 &&
                        steps?.map((text, index) => (
                            <AnimateOnLoad key={index} index={index}>
                                <p
                                    className="max-w-[35ch] text-sm break-word"
                                    key={index}
                                >
                                    {index + 1}. &nbsp; {text}
                                </p>
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
            )}
        </>
    );
};

export default Display;
