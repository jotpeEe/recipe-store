import { type FC } from 'react';

import { ReviewCard, SectionTitle, Slider } from '@components';
import { SectionLayout as Layout } from '@layouts';
import { type IReview } from '@lib/types';

const Reviews: FC<{
    reviews: IReview[] | undefined;
}> = ({ reviews }) => {
    if (!reviews) return null;

    return (
        <Layout id="reviews">
            <div className="grid-col-1 grid self-start">
                <SectionTitle
                    subtitle="Reviews"
                    title="Share your experience with others"
                    description="If you tried a recipe, let creator know how you feel about it."
                />
                <Slider controller>
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} {...review} />
                    ))}
                </Slider>
            </div>
        </Layout>
    );
};

export default Reviews;
