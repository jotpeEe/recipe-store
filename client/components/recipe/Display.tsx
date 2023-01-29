import { FC, useEffect, useState } from 'react';

import Animated from '@components/AnimatedDiv';
import ReviewMini from '@components/card/ReviewMini';
import Switch from '@components/Switch';
import { IIngredient, IReviewMini } from '@lib/types';

import Ingredient from './Ingredient';

type DisplayProps = {
    step?: number;
    ingredients?: IIngredient[];
    servings?: number | null;
    steps?: string[];
    reviews?: IReviewMini['review'][];
};

const Display: FC<DisplayProps> = ({
    step,
    ingredients,
    servings,
    steps,
    reviews,
}) => {
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
                    {reviews &&
                        active === 2 &&
                        reviews?.map((review, index) => (
                            <ReviewMini key={index} review={{ ...review }} />
                        ))}
                </div>
            )}
        </>
    );
};

export default Display;
