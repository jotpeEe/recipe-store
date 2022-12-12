import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

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

    @Field(() => Number, { nullable: true })
    prep_time: number;

    @Field(() => String, { nullable: true })
    cuisine: string;

    @Field(() => Number, { nullable: true })
    servings: number;

    @Field(() => String, { nullable: true })
    image: string;
}

export default UpdateInput;
