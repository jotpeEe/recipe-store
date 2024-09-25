import { useEffect, useState } from 'react';

import { type GetProfileDataQueryQuery } from '@generated/graphql';

const useProcessReviews = (
    when: (innerWidth: number) => boolean,
    reviews?: GetProfileDataQueryQuery['getMyReviews']['reviews']
) => {
    const [slicedReviews, setSlicedReviews] = useState<(typeof reviews)[]>([]);

    useEffect(() => {
        let ticking = false;

        const updateState = () => {
            const { innerWidth } = window;

            if (reviews?.length && when(innerWidth)) {
                const middle = Math.floor((reviews?.length as number) / 2);
                setSlicedReviews([
                    reviews?.slice(0, middle),
                    reviews.slice(middle),
                ]);
            }
            ticking = false;
        };

        const onResize = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateState);
                ticking = true;
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    const sliced = slicedReviews.length !== 0;

    return { slicedReviews, sliced };
};

export default useProcessReviews;
