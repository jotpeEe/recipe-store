import { Field, ObjectType } from 'type-graphql';

import Data from './data';

@ObjectType()
class Response {
    @Field(() => String)
    status: string;

    @Field(() => Data)
    recipe: Data;
}

export default Response;
