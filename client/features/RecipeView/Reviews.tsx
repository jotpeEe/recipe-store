import { type FC } from 'react';

import { ReviewList } from '@components';
import { useRecipeContext } from '@contexts';

const Reviews: FC = () => {
    const { active, id, user, reviews } = useRecipeContext();
    return (
        <>
            {reviews && reviews?.length > 0 && (
                <div>
                    {reviews && active === 'Reviews' && (
                        <ReviewList
                            addEnable
                            reviews={reviews}
                            id={id}
                            recipeAuthor={user}
                            fullWidth
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Reviews;
