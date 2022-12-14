import { SectionTitle, ReviewCard, CardList } from '@components';
import { SectionLayout as Layout } from '@layouts';

const Reviews: React.FC = () => (
    <Layout id="reviews">
        <div className="grid grid-col-1 self-start">
            <SectionTitle
                subtitle="Reviews"
                title="Share your experience with others"
                description="If you tried a recipe, let creator know how you feel about it."
            />
            <CardList>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </CardList>
            <CardList>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </CardList>
        </div>
    </Layout>
);

export default Reviews;
