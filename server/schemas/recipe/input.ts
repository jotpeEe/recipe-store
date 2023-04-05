import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { type Ingredient, IngredientInput } from './ingredient';

@InputType()
class Input {
    @MinLength(8, { message: 'Title must be at least 8 characters long' })
    @Field(() => String)
    title: string;

    @MinLength(10, {
        message: 'Description must be at least 10 characters long',
    })
    @Field(() => String)
    description: string;

    @Field(() => String)
    prep: string;

    @Field(() => String)
    cuisine: string;

    @Field(() => Number, { nullable: true })
    servings?: number;

    @Field(() => String, { nullable: true })
    image?: string;

    @Field({ nullable: true })
    temp?: boolean;

    @Field(() => [IngredientInput], { nullable: true })
    ingredients?: Ingredient[];

    @Field(() => [String], { nullable: true })
    steps?: string[];

    @Field(() => Number, { nullable: true })
    step?: number;
}

export default Input;
