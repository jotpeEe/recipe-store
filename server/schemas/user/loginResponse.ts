import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class LoginResponse {
    @Field(() => String)
    status: string;

    @Field(() => String)
    access_token: string;
}

export default LoginResponse;
