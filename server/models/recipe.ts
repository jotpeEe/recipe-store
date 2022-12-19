import {
    getModelForClass,
    ModelOptions,
    prop,
    Severity,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';

import { User } from '@models/user';

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
    prep: number;

    @prop({ required: true })
    cuisine: string;

    @prop({ required: true })
    servings: number;

    @prop({ required: true })
    image: string;

    @prop({ required: true, ref: () => User })
    user: Ref<User>;
}

const RecipeModel = getModelForClass<typeof Recipe>(Recipe);
export default RecipeModel;
