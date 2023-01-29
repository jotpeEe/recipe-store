import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class ReviewDataObject {
    @Field(() => String)
    readonly _id: string;

    @Field(() => String, { nullable: true })
    readonly id: string;

    @Field(() => String)
    text: string;

    @Field(() => [String])
    pos: string[];

    @Field(() => [String])
    neg: string[];

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}

export default ReviewDataObject;
