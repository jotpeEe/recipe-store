import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class StepInput {
    @Field({ nullable: true })
    label?: string;

    @Field()
    text: string;

    @Field({ nullable: true })
    edit?: boolean;
}

@ObjectType()
export class Step {
    @Field({ nullable: true })
    label?: string;

    @Field()
    text: string;

    @Field({ nullable: true })
    edit?: boolean;
}
