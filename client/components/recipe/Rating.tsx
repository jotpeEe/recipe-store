import React, { type FC, useMemo, useState } from 'react';

import RecipeRating from '@components/card/RecipeRating';
import { IconStar } from '@components/icons';
import Modal from '@components/Modal';
import { useRecipeContext } from '@contexts';

const Rating: FC = () => {
    const [clicked, setClicked] = useState(false);
    const { ratings, recipeRef } = useRecipeContext();

    const averageRating = useMemo(() => {
        if (!ratings) return undefined;
        const totalRating = ratings.reduce((acc, cur) => acc + cur.rating, 0);
        const avgRating = totalRating / ratings.length;
        return parseFloat(avgRating.toFixed(1));
    }, [ratings]);

    return (
        <div
            className="flex items-center justify-center rounded-3xl bg-yellow-100 py-1 px-2 text-xs leading-normal"
            onClick={() => {
                setClicked(true);
            }}
        >
            <IconStar width={18} height={18} fill="orange" />
            <span className="pl-1">{averageRating}</span>
            {clicked && (
                <Modal
                    setOpenModal={setClicked}
                    openModal={clicked}
                    target={recipeRef.current || undefined}
                >
                    <RecipeRating />
                </Modal>
            )}
        </div>
    );
};

export default Rating;
