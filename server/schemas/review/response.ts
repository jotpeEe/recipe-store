import { Field, ObjectType } from 'type-graphql';

import ReviewData from './data';

@ObjectType()
class ReviewResponse {
    @Field(() => String)
    status: string;

    @Field(() => ReviewData)
    review: ReviewData;
}

export default ReviewResponse;
