import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { type Ingredient, IngredientInput } from './ingredient';

@InputType()
class UpdateInput {
    @MinLength(1, { message: 'Title is required' })
    @Field(() => String, { nullable: true })
    title: string;

    @MinLength(1, {
        message: 'Description is required',
    })
    @Field(() => String, { nullable: true })
    description: string;

    @Field(() => String, { nullable: true })
    prep: string;

    @Field(() => String, { nullable: true })
    cuisine: string;

    @Field(() => Number, { nullable: true })
    servings?: number;

    @Field(() => String, { nullable: true })
    image?: string;

    @Field(() => [IngredientInput], { nullable: true })
    ingredients?: Ingredient[];

    @Field(() => [String], { nullable: true })
    reviews?: string[];

    @Field(() => [String], { nullable: true })
    steps?: string[];

    @Field(() => Number, { nullable: true })
    step?: number;
}

export default UpdateInput;
