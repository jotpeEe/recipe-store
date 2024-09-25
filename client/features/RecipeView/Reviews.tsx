import { type FC } from 'react';

import { ReviewList } from '@components';
import { useRecipeContext } from '@contexts';

const Reviews: FC = () => {
    const { active, id, user, reviews } = useRecipeContext();
    return (
        <>
            {reviews && reviews.length !== 0 && (
                <div className="h-full">
                    {active === 'Reviews' && (
                        <ReviewList
                            addEnable
                            reviews={reviews}
                            id={id}
                            recipeAuthor={user}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Reviews;
