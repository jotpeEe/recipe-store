import { Field, ObjectType } from 'type-graphql';

import UserData from './data';

@ObjectType()
class UserResponse {
    @Field(() => String)
    status: string;

    @Field(() => UserData)
    user: UserData;
}

export default UserResponse;
