import { Slider, SectionTitle, ReviewCard } from '@components';
import { useGetLastReviewsQuery } from '@generated/graphql';
import { SectionLayout as Layout } from '@layouts';
import { requestClient } from '@requests';

const Reviews: React.FC = () => {
    const { data: reviews } = useGetLastReviewsQuery(
        requestClient,
        {},
        {
            select: res => res.getLastReviews.reviews,
        }
    );

    if (!reviews) return null;

    return (
        <Layout id="reviews">
            <div className="grid grid-col-1 self-start">
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
