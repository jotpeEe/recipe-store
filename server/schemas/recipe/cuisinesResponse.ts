import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class CuisineResponse {
    @Field(() => String)
    status: string;

    @Field(() => Number)
    results: number;

    @Field(() => [String])
    cuisines: string[];
}

export default CuisineResponse;
