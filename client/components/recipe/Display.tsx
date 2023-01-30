import { FC, useEffect, useState } from 'react';

import Animated from '@components/AnimatedDiv';
import ReviewList from '@components/ReviewList';
import Switch from '@components/Switch';

// eslint-disable-next-line import/no-cycle
import { useRecipe } from '.';
import Ingredient from './Ingredient';

const Display: FC = () => {
    const { id, step, ingredients, servings, steps, reviews, user } =
        useRecipe();

    const [active, setActive] = useState<number>(0);

    useEffect(() => {
        if (step === 2) setActive(1);
        if (step !== 2) setActive(0);
    }, [step]);

    const items = ingredients?.length;

    const buttons = ['Ingredients', 'steps', 'Reviews'];

    return (
        <>
            {(ingredients || steps) && (
                <Animated className="col-span-3 gap-2 flex h-fit">
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
                            {`${
                                items !== 1 ? `${items} items` : `${items} item`
                            } `}
                        </div>
                    </div>
                    {ingredients &&
                        active === 0 &&
                        ingredients?.map((ingredient, index) => (
                            <Ingredient
                                key={index}
                                {...{ ...ingredient, id: index }}
                            />
                        ))}
                    {steps &&
                        active === 1 &&
                        steps?.map((text, index) => <p key={index}>{text}</p>)}
                    {reviews && active === 2 && (
                        <ReviewList
                            addEnable
                            reviews={reviews}
                            id={id}
                            recipeAuthor={user}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Display;
