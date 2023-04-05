import { type FC, useCallback, useState } from 'react';

import cn from 'classnames';

import { type IIngredient } from '@lib/types';

const Ingredient: FC<IIngredient> = ({ name, amount }) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => setDisabled(prevState => !prevState);

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

export default Ingredient;
