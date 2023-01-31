import { Field, ObjectType } from 'type-graphql';

import ReviewData from '@schemas/review/data';
import { UserData } from '@schemas/user';

import DataObject from './dataObject';

@ObjectType()
class PopulatedData extends DataObject {
    @Field(() => UserData)
    user: UserData;

    @Field(() => [ReviewData])
    reviews: ReviewData[];
}

export default PopulatedData;
