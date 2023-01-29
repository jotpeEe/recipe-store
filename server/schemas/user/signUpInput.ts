import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class SignUpInput {
    @Field(() => String)
    name: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(32, { message: 'Password must be at most 32 characters long' })
    @Field(() => String)
    password: string;

    @Field(() => String)
    passwordConfirm: string | undefined;

    @Field(() => Boolean)
    terms: boolean;

    @Field(() => String, { nullable: true })
    photo: string;
}

export default SignUpInput;
