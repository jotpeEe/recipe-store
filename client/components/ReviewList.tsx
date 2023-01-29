import { FC, MouseEventHandler, useCallback, useState } from 'react';

import { IReview } from '@lib/types';

import Button from './Button';
import ReviewMini from './card/ReviewMini';

type ReviewListProps = {
    reviews?: IReview[];
};

const ReviewList: FC<ReviewListProps> = ({ reviews }) => {
    const [clicked, setClicked] = useState(false);

    const REVIEWS_LIMIT = 4;
    const [limit, setLimit] = useState(REVIEWS_LIMIT);
    const slicedReviews = reviews?.slice(0, limit);

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        e => {
            e.preventDefault();
            if (reviews) setLimit(clicked ? REVIEWS_LIMIT : reviews.length);
            setClicked(state => !state);
        },
        [clicked]
    );

    return (
        <div className="max-h-[370px] overflow-y-auto">
            {slicedReviews?.map((review, index) => (
                <ReviewMini key={index} review={review} />
            ))}
            {reviews && reviews?.length > REVIEWS_LIMIT && (
                <div>
                    <Button outlined onClick={handleClick} size="sm">
                        {clicked ? 'Load less' : 'Load more'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
