import { Field, ObjectType } from 'type-graphql';

import { RatingData } from '@schemas/rating';
import { ReviewPopulatedData } from '@schemas/review';
import { UserData } from '@schemas/user';

import DataObject from './dataObject';

@ObjectType()
class PopulatedData extends DataObject {
    @Field(() => UserData)
    user: UserData;

    @Field(() => [ReviewPopulatedData])
    reviews: ReviewPopulatedData[];

    @Field(() => [RatingData])
    ratings: RatingData[];
}

export default PopulatedData;
