import { type FC } from 'react';

import { ReviewList } from '@components';
import { useRecipeContext } from '@contexts';

const Reviews: FC = () => {
    const { active, id, user, reviews } = useRecipeContext();
    return (
        <div>
            {reviews && active === 2 && (
                <ReviewList
                    addEnable
                    reviews={reviews}
                    id={id}
                    recipeAuthor={user}
                    fullWidth
                />
            )}
        </div>
    );
};

export default Reviews;
