import { Field, ObjectType } from 'type-graphql';

import { RecipeData } from '@schemas/recipe';
import { UserData } from '@schemas/user';

import ReviewDataObject from './dataObject';

@ObjectType()
class ReviewPopulatedData extends ReviewDataObject {
    @Field(() => RecipeData)
    recipe: RecipeData;

    @Field(() => UserData)
    user: UserData;

    @Field(() => UserData)
    recipeAuthor: UserData;
}

export default ReviewPopulatedData;
