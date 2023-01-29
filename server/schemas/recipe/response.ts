import { Field, ObjectType } from 'type-graphql';

import RecipeData from './data';

@ObjectType()
class Response {
    @Field(() => String)
    status: string;

    @Field(() => RecipeData)
    recipe: RecipeData;
}

export default Response;
