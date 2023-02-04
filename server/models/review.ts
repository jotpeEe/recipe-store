import {
    getModelForClass,
    ModelOptions,
    prop,
    Severity,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';

import { Recipe } from './recipe';
import { User } from './user';

@ModelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class Review {
    readonly _id: string;

    @prop({ required: true })
    text: string;

    @prop({ required: true, default: [] })
    pos: string[];

    @prop({ required: true, default: [] })
    neg: string[];

    @prop({ required: true, ref: () => Recipe })
    recipe: Ref<Recipe>;

    @prop({ required: true, ref: () => User })
    user: Ref<User>;

    @prop({ required: true, ref: () => User })
    recipeAuthor: Ref<User>;
}

const ReviewModel = getModelForClass<typeof Review>(Review);
export default ReviewModel;
