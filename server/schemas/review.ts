import { Field, ObjectType } from 'type-graphql';

import { UserData } from './user';

@ObjectType()
export class ReviewDataObject {
    @Field(() => String)
    readonly _id: string;

    @Field(() => String, { nullable: true })
    readonly id: string;

    @Field(() => String)
    text: string;

    @Field(() => [String])
    pos: string[];

    @Field(() => [String])
    neg: string[];

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}

@ObjectType()
export class ReviewData extends ReviewDataObject {
    @Field(() => String)
    user: string;

    @Field(() => String)
    recipe: string;

    @Field(() => String)
    recipeAuthor: string;
}

@ObjectType()
export class ReviewPopulatedData extends ReviewDataObject {
    @Field(() => String)
    recipe: string;

    @Field(() => UserData)
    user: UserData;

    @Field(() => UserData)
    recipeAuthor: UserData;
}

@ObjectType()
export class ReviewListResponse {
    @Field(() => String)
    status: string;

    @Field(() => Number)
    results: number;

    @Field(() => [ReviewPopulatedData])
    reviews: ReviewPopulatedData[];
}

@ObjectType()
export class ReviewPopulatedResponse {
    @Field(() => String)
    status: string;
}

@ObjectType()
export class ReviewResponse {
    @Field(() => String)
    status: string;

    @Field(() => ReviewPopulatedData)
    review: ReviewPopulatedData;
}
