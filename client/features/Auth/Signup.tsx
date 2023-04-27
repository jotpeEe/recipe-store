import { type FC, useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { type TypeOf, any, literal, object, string } from 'zod';

import { Button, Checkbox, ImageInput, Input, SignUpInfo } from '@components';
import { useSignUpUserMutation } from '@generated/graphql';
import { imageValidation, uploadImage } from '@lib';
import { requestClient } from '@requests';

const signupSchema = object({
    name: string()
        .min(1, 'Name is required')
        .max(16, 'Name must be less than 16 characters'),
    email: string().min(1, 'Email is required').email(),
    photo: any().superRefine((f, ctx) => imageValidation(f, ctx)),
    password: string()
        .min(1, 'Password is required')
        .min(6, 'Password must be more than 6 characters')
        .max(32, {
            message: 'Password must be less than 32 characters',
        }),
    passwordConfirm: string().min(1, 'Confirm password is required'),
    terms: literal(true, {
        errorMap: () => ({
            message: 'Accept the terms and conditions',
        }),
    }),
}).superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'The passwords did not match',
            path: ['passwordConfirm'],
        });
    }
});

type SignUpInput = TypeOf<typeof signupSchema>;

/**
 * SignUp: The SignUp component used with auth route of the app.
 * @return {JSX.Element} The JSX Code for the SignUp Page
 */

const SignUp: FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const methods = useForm<SignUpInput>({
        resolver: zodResolver(signupSchema),
    });

    const { handleSubmit, reset, setError } = methods;

    const { mutate: signUpUser, isLoading } = useSignUpUserMutation(
        requestClient,
        {
            onSuccess() {
                reset();
                router.push('/profile');
                setLoading(false);
            },
            onError(error: any) {
                error.response.errors.forEach((e: any) => {
                    const { message } = e;
                    setError('email', { message });
                });
            },
        }
    );

    useEffect(() => {
        if (isLoading === true) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoading]);

    const onSubmitHandler: SubmitHandler<SignUpInput> = useCallback(
        async values => {
            setLoading(true);
            const data: any = await uploadImage(values.photo?.[0]);
            const input = { ...values, photo: data };
            signUpUser({ input });
        },
        []
    );

    return (
        <div className="mx-auto flex w-screen items-center justify-center py-2 md:w-full">
            <div className="flex flex-col items-center  md:flex-row md:items-start md:justify-between">
                <SignUpInfo />
                <div className="flex flex-col items-start justify-center rounded-3xl p-8 shadow-form [&>div]:pb-7 [&>a]:pb-7">
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmitHandler)}
                            noValidate
                        >
                            <Input
                                label="Name"
                                name="name"
                                placeholder="Enter name"
                            />
                            <Input
                                label="Email"
                                name="email"
                                placeholder="Enter email"
                                type="email"
                            />
                            <Input
                                label="Password"
                                name="password"
                                placeholder="Enter password"
                                type="password"
                            />
                            <Input
                                label="Confirm Password"
                                name="passwordConfirm"
                                placeholder="Confirm password"
                                type="password"
                            />
                            <Checkbox label="Terms & Conditions" name="terms" />
                            <ImageInput name="photo" />
                            <Button
                                type="submit"
                                className="my-7"
                                fullWidth
                                arrow
                                isLoading={loading}
                            >
                                Sign up
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
