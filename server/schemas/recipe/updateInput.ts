import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IngredientInput, Ingredient } from './ingredient';

@InputType()
class UpdateInput {
    @MinLength(8, { message: 'Title must be at least 8 characters long' })
    @Field(() => String, { nullable: true })
    title: string;

    @MinLength(10, {
        message: 'Description must be at least 10 characters long',
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
