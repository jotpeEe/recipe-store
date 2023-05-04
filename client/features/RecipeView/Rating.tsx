import React, { type FC, useMemo, useState } from 'react';

import { Modal, RecipeRating } from '@components';
import { useRecipeContext } from '@contexts';
import { IconStar } from '@icons';

const Rating: FC<{ handleRating: () => void }> = ({ handleRating }) => {
    const [clicked, setClicked] = useState(false);
    const { ratings, recipeRef } = useRecipeContext();

    const averageRating = useMemo(() => {
        if (!ratings || ratings.length === 0) return undefined;
        const totalRating = ratings.reduce((acc, cur) => acc + cur.rating, 0);
        const avgRating = totalRating / ratings.length;
        return avgRating.toFixed(1);
    }, [ratings]);

    return (
        <div
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-yellow-100 py-1 px-2 text-xs leading-normal"
            onClick={() => {
                handleRating();
            }}
        >
            <IconStar width={18} height={18} fill="orange" />
            {averageRating && <span className="pl-1">{averageRating}</span>}
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
