import { Field, ObjectType } from 'type-graphql';

import { Ingredient } from './ingredient';

@ObjectType()
class DataObject {
    @Field(() => String)
    readonly _id: string;

    @Field(() => String, { nullable: true })
    readonly id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    prep: string;

    @Field(() => String)
    cuisine: string;

    @Field(() => Number, { nullable: true })
    servings?: number;

    @Field(() => String)
    image: string;

    @Field(() => Boolean)
    temp: boolean;

    @Field(() => [Ingredient])
    ingredients: Ingredient[];

    @Field(() => Number)
    step: number;

    @Field(() => [String])
    steps: string[];

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}

export default DataObject;
