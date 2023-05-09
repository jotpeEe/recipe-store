import React, {
    type FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

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
    const [openIndex, setOpenIndex] = useState(-1);
    const ingredientsRef = useRef<(HTMLLIElement | HTMLDivElement | null)[]>(
        []
    );

    const handleClickAway = useCallback((event: MouseEvent) => {
        if (
            ingredientsRef.current.every(
                ref => ref && !ref.contains(event.target as Node)
            )
        ) {
            setOpenIndex(-1);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickAway);
        return () => {
            document.removeEventListener('mousedown', handleClickAway);
        };
    }, [handleClickAway]);

    const handleOpenMenu = (index: number) => setOpenIndex(index);

    return (
        <>
            {ingredients?.length !== 0 && active === 'Ingredients' && (
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
                                    <div
                                        ref={ref => {
                                            ingredientsRef.current[index] = ref;
                                        }}
                                    >
                                        {withEdit ? (
                                            <Edit
                                                variant="array"
                                                name={['name', 'amount']}
                                                ingId={index}
                                                withButtons
                                                handleOpenMenu={handleOpenMenu}
                                                openIndex={openIndex}
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
                                    </div>
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
