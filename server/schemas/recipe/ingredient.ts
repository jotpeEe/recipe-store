import { Field, ObjectType, InputType } from 'type-graphql';

@InputType()
export class IngredientInput {
    @Field()
    name: string;

    @Field()
    amount: string;
}

@ObjectType()
export class Ingredient {
    @Field()
    name: string;

    @Field()
    amount: string;
}
