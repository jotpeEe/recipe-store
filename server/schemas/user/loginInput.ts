import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class LoginInput {
    @IsEmail()
    @Field(() => String)
    email: string;

    @MinLength(6, { message: 'Invalid email or password' })
    @MaxLength(16, { message: 'Invalid email or password' })
    @Field(() => String)
    password: string;
}

export default LoginInput;
