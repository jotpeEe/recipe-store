import { Field, ObjectType } from 'type-graphql';

import { UserData } from './user';

@ObjectType()
export class RatingDataObject {
    @Field()
    readonly _id: string;

    @Field()
    readonly id: string;

    @Field()
    rating: number;
}

@ObjectType()
export class RatingData extends RatingDataObject {
    @Field()
    user: string;

    @Field()
    recipe: string;
}

@ObjectType()
export class RatingPopulatedData extends RatingDataObject {
    @Field(() => String)
    recipe: string;

    @Field(() => UserData)
    user: UserData;
}

@ObjectType()
export class RatingListResponse {
    @Field(() => String)
    status: string;

    @Field(() => Number)
    results: number;

    @Field(() => [RatingPopulatedData])
    ratings: RatingPopulatedData[];
}

@ObjectType()
export class RatingResponse {
    @Field(() => String)
    status: string;

    @Field(() => RatingData)
    rating: RatingData;
}

@ObjectType()
export class RatingDeleteResponse {
    @Field(() => String)
    status: string;
}
