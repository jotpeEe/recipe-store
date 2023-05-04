import React, { type FC, useCallback, useState } from 'react';

import cn from 'classnames';

import { AnimateOnLoad } from '@components';
import { useRecipeContext } from '@contexts';

import Edit from './Edit';

const Ingredient: FC<{ name: string; amount: string }> = ({ name, amount }) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = useCallback(
        () => setDisabled(prevState => !prevState),
        [disabled]
    );

    return (
        <div
            onClick={handleClick}
            className={cn(
                'relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg py-2 transition after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:transition ',
                disabled
                    ? 'text-gray-300 line-through after:bg-gray-300'
                    : 'after:bg-primary'
            )}
        >
            <p className="text-xs">{name}</p>
            <span className="text-xs font-semibold">{amount}</span>
        </div>
    );
};

const Ingredients: FC = () => {
    const { active, ingredients, withEdit } = useRecipeContext();

    return (
        <>
            {ingredients?.length !== 0 && active === 0 && (
                <ul className="flex flex-col gap-2">
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
                                    {withEdit ? (
                                        <Edit
                                            variant="array"
                                            name={['name', 'amount']}
                                            ingId={index}
                                            withButtons
                                        >
                                            <Ingredient
                                                name={ingredient.name}
                                                amount={ingredient.amount}
                                            />
                                        </Edit>
                                    ) : (
                                        <Ingredient
                                            name={ingredient.name}
                                            amount={ingredient.amount}
                                        />
                                    )}
                                </AnimateOnLoad>
                            );
                        return null;
                    })}
                </ul>
            )}
        </>
    );
};

export default Ingredients;
