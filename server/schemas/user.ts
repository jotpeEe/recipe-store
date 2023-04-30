import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class UserData {
    @Field(() => String)
    readonly _id: string;

    @Field(() => String)
    readonly id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    role: string;

    @Field(() => String)
    photo: string;

    @Field(() => Boolean)
    terms: boolean;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}

@InputType()
export class LoginInput {
    @IsEmail()
    @Field(() => String)
    email: string;

    @MinLength(6, { message: 'Invalid email or password' })
    @MaxLength(16, { message: 'Invalid email or password' })
    @Field(() => String)
    password: string;
}

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    status: string;

    @Field(() => String)
    access_token: string;
}

@ObjectType()
export class UserResponse {
    @Field(() => String)
    status: string;

    @Field(() => UserData)
    user: UserData;
}

@InputType()
export class SignUpInput {
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
