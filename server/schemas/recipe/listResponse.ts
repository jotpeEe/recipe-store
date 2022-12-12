import { Field, ObjectType } from 'type-graphql';

import PopulatedData from './populatedData';

@ObjectType()
class ListResponse {
    @Field(() => String)
    status: string;

    @Field(() => Number)
    results: number;

    @Field(() => [PopulatedData])
    recipes: PopulatedData[];
}

export default ListResponse;
