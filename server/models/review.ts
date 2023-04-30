import {
    ModelOptions,
    type Ref,
    Severity,
    getModelForClass,
    prop,
} from '@typegoose/typegoose';

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

    @prop()
    recipe: string;

    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ ref: () => User })
    recipeAuthor: Ref<User>;
}

const ReviewModel = getModelForClass<typeof Review>(Review);
export default ReviewModel;
