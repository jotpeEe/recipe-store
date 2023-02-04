import { Field, ObjectType } from 'type-graphql';

import ReviewPopulatedData from './populatedData';

@ObjectType()
class ReviewListResponse {
    @Field(() => String)
    status: string;

    @Field(() => Number)
    results: number;

    @Field(() => [ReviewPopulatedData])
    reviews: ReviewPopulatedData[];
}

export default ReviewListResponse;
