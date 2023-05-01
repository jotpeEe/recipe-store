import { type FC } from 'react';

import { IconDish } from '@components/icons';
import { useRecipeContext } from '@contexts';

const Servings: FC = () => {
    const { servings, ingredients } = useRecipeContext();

    const items = ingredients?.length;

    return (
        <div className="flex justify-between text-sm text-outlined">
            <div className="flex items-center gap-1">
                <IconDish />
                {servings} serve
            </div>

            <div className="">
                {items !== 1 ? `${items} items` : `${items} item`}
            </div>
        </div>
    );
};

export default Servings;
