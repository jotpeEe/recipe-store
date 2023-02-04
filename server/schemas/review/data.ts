import { Field, ObjectType } from 'type-graphql';

import ReviewDataObject from './dataObject';

@ObjectType()
class ReviewData extends ReviewDataObject {
    @Field(() => String)
    user: string;

    @Field(() => String)
    recipe: string;

    @Field(() => String)
    recipeAuthor: string;
}

export default ReviewData;
