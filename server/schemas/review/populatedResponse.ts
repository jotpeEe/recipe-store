import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class ReviewPopulatedResponse {
    @Field(() => String)
    status: string;
}

export default ReviewPopulatedResponse;
