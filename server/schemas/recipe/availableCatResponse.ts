import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class AvailableCatResponse {
    @Field(() => String)
    status: string;

    @Field(() => Number)
    results: number;

    @Field(() => [String])
    category: string[];
}

export default AvailableCatResponse;
