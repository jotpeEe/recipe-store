import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class UserData {
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

export default UserData;
