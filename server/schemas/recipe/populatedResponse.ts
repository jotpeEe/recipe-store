import { Field, ObjectType } from 'type-graphql';

import PopulatedData from './populatedData';

@ObjectType()
class PopulatedResponse {
    @Field(() => String)
    status: string;

    @Field(() => PopulatedData, { nullable: true })
    recipe: PopulatedData;
}

export default PopulatedResponse;
