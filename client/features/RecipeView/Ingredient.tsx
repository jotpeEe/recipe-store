import { type FC, useCallback, useState } from 'react';

import cn from 'classnames';

import { useRecipeContext } from '@contexts';

import Edit from './Edit';

const IngredientInfo: FC<{ name: string; amount: string }> = ({
    name,
    amount,
}) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = useCallback(
        () => setDisabled(prevState => !prevState),
        [disabled]
    );

    return (
        <div
            onClick={handleClick}
            className={cn(
                'relative flex w-full select-none items-center justify-between rounded-lg py-2 transition after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:transition ',
                disabled
                    ? 'text-gray-300 line-through after:bg-gray-300'
                    : 'after:bg-primary'
            )}
        >
            <p className="text-sm">{name}</p>
            <span className="font-semibold">{amount}</span>
        </div>
    );
};

const Ingredient: FC<{ name: string; amount: string; id: number }> = ({
    name,
    amount,
    id,
}) => {
    const { withEdit } = useRecipeContext();
    return (
        <>
            {withEdit ? (
                <Edit
                    variant="array"
                    name={['name', 'amount']}
                    ingId={id}
                    withButtons
                >
                    <IngredientInfo name={name} amount={amount} />
                </Edit>
            ) : (
                <IngredientInfo name={name} amount={amount} />
            )}
        </>
    );
};

export default Ingredient;
