import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

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

    @Field(() => Number)
    prep: number;

    @Field(() => String)
    cuisine: string;

    @Field(() => Number)
    servings: number;

    @Field(() => String)
    image: string;
}

export default Input;
