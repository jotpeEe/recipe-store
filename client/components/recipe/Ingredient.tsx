import { FC, useState } from 'react';

import classNames from 'classnames';

import { type IIngredient } from '@lib/types';

const Ingredient: FC<IIngredient> = ({ name, amount }) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => setDisabled(prevState => !prevState);

    return (
        <div
            className={classNames(
                'col-span-3 flex gap-4 items-center w-fit py-2 px-3 rounded-xl cursor-pointer transition',
                disabled ? 'bg-gray-300 line-thgrough' : 'bg-primary'
            )}
            onClick={handleClick}
        >
            <div className="flex items-center gap-4">
                <h5 className={classNames(disabled ? 'line-through' : '')}>
                    {amount}
                </h5>
            </div>
            <div className={classNames(disabled ? 'line-through' : '')}>
                {name}
            </div>
        </div>
    );
};

export default Ingredient;
