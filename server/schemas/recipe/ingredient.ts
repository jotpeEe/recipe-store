import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class IngredientInput {
    @Field()
    name: string;

    @Field()
    amount: string;

    @Field({ nullable: true })
    edit?: boolean;
}

@ObjectType()
export class Ingredient {
    @Field()
    name: string;

    @Field()
    amount: string;

    @Field({ nullable: true })
    edit?: boolean;
}
