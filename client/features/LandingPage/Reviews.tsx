import { type FC } from 'react';

import dynamic from 'next/dynamic';

import { SectionTitle, Slider, Spinner } from '@components';
import { SectionLayout as Layout } from '@layouts';
import { type IReview } from '@lib/types';

const ReviewCard = dynamic(() => import('../../components/card/Review'), {
    loading: () => <Spinner />,
});

type ReviewsProps = {
    reviews: IReview[] | undefined;
};

const Reviews: FC<ReviewsProps> = ({ reviews }) => (
    <Layout id="reviews">
        <div className="mb-8 grid  md:mb-0 lg:grid-cols-[1fr_2fr]">
            <SectionTitle
                subtitle="Reviews"
                title="Share your experience with others"
                description="If you tried a recipe, let the creator know how you feel about it."
            />
            <div className="overflow-hidden lg:px-4">
                <Slider
                    controller
                    config={{ listeners: true }}
                    fullWidth
                    minItemWidth={250}
                >
                    {reviews?.map((review, index) => (
                        <ReviewCard key={index} {...review} />
                    ))}
                </Slider>
            </div>
        </div>
    </Layout>
);

export default Reviews;
