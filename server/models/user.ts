import {
    ModelOptions,
    Severity,
    getModelForClass,
    index,
    pre,
    prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

// eslint-disable-next-line no-use-before-define
@pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    return next();
})
@ModelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ email: 1 })
export class User {
    readonly _id: string;

    readonly id: string;

    @prop({ required: true })
    name: string;

    @prop({ required: true, unique: true, lowercase: true })
    email: string;

    @prop({ default: 'user' })
    role: string;

    @prop({ required: true, select: false })
    password: string;

    @prop({ required: true })
    passwordConfirm: string | undefined;

    @prop({ default: '/default.png' })
    photo: string;

    @prop({ required: true })
    terms: boolean;

    @prop({ default: true, select: false })
    verified: boolean;

    static async comparePasswords(
        hashedPassword: string,
        candidatePassword: string
    ) {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}

const UserModel = getModelForClass<typeof User>(User);
export default UserModel;
