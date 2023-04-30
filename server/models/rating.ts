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
export class Rating {
    readonly _id: string;

    @prop({ required: true })
    rating: number;

    @prop({ ref: () => User })
    user: Ref<User>;

    @prop()
    recipe: string;
}

const RatingModel = getModelForClass<typeof Rating>(Rating);
export default RatingModel;
