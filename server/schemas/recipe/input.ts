import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { type Ingredient, IngredientInput } from './ingredient';
import { type Step, StepInput } from './step';

@InputType()
class Input {
    @MinLength(1, { message: 'Title is required' })
    @Field(() => String)
    title: string;

    @MinLength(1, {
        message: 'Description is required',
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

    @Field(() => [StepInput], { nullable: true })
    steps?: Step[];

    @Field(() => Number, { nullable: true })
    step?: number;
}

export default Input;
