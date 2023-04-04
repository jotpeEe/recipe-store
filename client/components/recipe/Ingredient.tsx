import { FC, useState } from 'react';

import cn from 'classnames';

import { type IIngredient } from '@lib/types';

const Ingredient: FC<IIngredient> = ({ name, amount }) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => setDisabled(prevState => !prevState);

    return (
        <div
            onClick={handleClick}
            className={cn(
                'relative py-2 rounded-lg flex select-none justify-between items-center after:h-[1px] transition after:w-full after:absolute after:bottom-0 after:transition after:right-0 ',
                disabled
                    ? 'line-through text-gray-300 after:bg-gray-300'
                    : 'after:bg-primary'
            )}
        >
            <p className="text-sm">{name}</p>
            <span className="font-semibold">{amount}</span>
        </div>
    );
};

export default Ingredient;
