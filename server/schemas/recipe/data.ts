import { Field, ObjectType } from 'type-graphql';

import DataObject from './dataObject';

@ObjectType()
class RecipeData extends DataObject {
    @Field(() => String)
    user: string;
}

export default RecipeData;
