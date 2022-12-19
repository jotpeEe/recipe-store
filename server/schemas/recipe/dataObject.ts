import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class DataObject {
    @Field(() => String)
    readonly _id: string;

    @Field(() => String, { nullable: true })
    readonly id: string;

    @Field(() => String)
    title: string;

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

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}

export default DataObject;
