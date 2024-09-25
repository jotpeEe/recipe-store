import {
    ModelOptions,
    type Ref,
    Severity,
    getModelForClass,
    prop,
} from '@typegoose/typegoose';

import { type Ingredient, type Step } from '@schemas/recipe';

import { Rating } from './rating';
import { Review } from './review';
import { User } from './user';

@ModelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class Recipe {
    readonly _id: string;

    @prop({ required: true })
    title: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    prep: string;

    @prop({ required: true })
    cuisine: string;

    @prop()
    servings: number;

    @prop({
        default: '/default-recipe.png',
    })
    image: string;

    @prop({ default: false })
    temp: boolean;

    @prop()
    step: number;

    @prop()
    steps: Step[];

    @prop({ ref: () => Rating })
    ratings: Ref<Rating>[];

    @prop({ ref: () => Review })
    reviews: Ref<Review>[];

    @prop()
    ingredients: Ingredient[];

    @prop({ required: true, ref: () => User })
    user: Ref<User>;
}

const RecipeModel = getModelForClass<typeof Recipe>(Recipe);
export default RecipeModel;
