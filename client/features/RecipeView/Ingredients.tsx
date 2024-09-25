import React, { type FC, useCallback, useRef, useState } from 'react';

import cn from 'classnames';

import {
    Button,
    Dropdown,
    type DropdownProps,
    IngredientInput,
} from '@components';
import { useRecipeContext } from '@contexts';
import Icon from '@icons';
import useCrudOperations from 'client/hooks/useCrudOperations';

type IngredientProps = {
    values: {
        name?: string;
        amount?: string;
    };
    dropdownOptions?: DropdownProps;
};

const Ingredient: FC<IngredientProps> = ({
    values: { name, amount },
    dropdownOptions,
}) => {
    const [disabled, setDisabled] = useState(false);
    const { isTheSameUser, withEdit } = useRecipeContext();

    const handleClick = useCallback(
        () => setDisabled(prevState => !prevState),
        [disabled]
    );

    const edit = withEdit && isTheSameUser && dropdownOptions;

    if (name?.length === 0 || amount?.length === 0) return null;

    return (
        <>
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
            {edit && <Dropdown {...dropdownOptions} />}
        </>
    );
};

const Ingredients: FC = () => {
    const ingredientsRef = useRef(null);
    const { active, withEdit, ingredients, isTheSameUser } = useRecipeContext();

    const { fields, handleRemoveItem, handleAppendItem, dropdownProps } =
        useCrudOperations('ingredients');

    const edit = isTheSameUser && withEdit;
    const views = withEdit ? fields : ingredients;

    if (active !== 'Ingredients') return null;

    return (
        <ul className="flex flex-col gap-4" ref={ingredientsRef}>
            {views?.map((ing, index) => (
                <li key={index} className="relative flex">
                    {ing.edit ? (
                        <IngredientInput
                            index={index}
                            handleRemove={() => handleRemoveItem(index)}
                            defaultValues={fields?.[index]}
                            edit
                        />
                    ) : (
                        <Ingredient
                            values={ing}
                            dropdownOptions={{
                                ...dropdownProps,
                                idx: index,
                                className: 'mr-[-20px]',
                            }}
                        />
                    )}
                </li>
            ))}
            {edit && (
                <div className="flex items-center justify-center">
                    <Button
                        onClick={handleAppendItem}
                        tooltip="Add ingredient"
                        className="border-slate-600 p-1 text-slate-800 hover:bg-slate-600 hover:text-white"
                        size="custom"
                        variant="custom"
                        icon={<Icon name="Add" className="h-3" />}
                    />
                </div>
            )}
        </ul>
    );
};

export default Ingredients;
