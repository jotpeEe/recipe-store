import { FC, useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { boolean, object, ref, string } from 'yup';

import { Button, FormInput, ImageInput, SignUpInfo } from '@components';
import { SignUpInput, useSignUpUserMutation } from '@generated/graphql';
import { requestClient } from '@requests';

const signupSchema = object({
    name: string()
        .required('Name is required')
        .min(3, 'Name must be more than 3 characters')
        .max(16, 'Name must be less than 16 characters'),
    email: string().required('Email is required').email('Email is invalid'),
    photo: string().required('Photo is required'),
    password: string()
        .required('Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string()
        .required('Confirm your password')
        .oneOf([ref('password'), null], 'Passwords must match'),
    terms: boolean().oneOf([true], 'Accept terms & conditions'),
});

/**
 * SignUp: The SignUp page of the web app
 * @return {JSX.Element} The JSX Code for the SignUp Page
 */

const SignUp: FC = () => {
    const router = useRouter();

    const methods = useForm<SignUpInput>({
        resolver: yupResolver(signupSchema),
    });

    const { handleSubmit, reset, setError } = methods;

    const { mutate: signUpUser, isLoading } = useSignUpUserMutation(
        requestClient,
        {
            onSuccess() {
                reset();
                router.push('/profile');
            },
            onError(error: any) {
                error.response.errors.forEach((e: any) => {
                    const { message } = e;
                    setError('email', { message });
                });
            },
        }
    );

    const onSubmitHandler: SubmitHandler<SignUpInput> = useCallback(
        values => signUpUser({ input: values }),
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
                            <FormInput
                                label="Name"
                                name="name"
                                placeholder="Enter name"
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                placeholder="Enter email"
                                type="email"
                            />
                            <FormInput
                                label="Password"
                                name="password"
                                placeholder="Enter password"
                                type="password"
                            />
                            <FormInput
                                label="Confirm Password"
                                name="passwordConfirm"
                                placeholder="Confirm password"
                                type="password"
                            />
                            <FormInput
                                label="Terms & Conditions"
                                name="terms"
                                type="checkbox"
                                padding
                            />
                            <ImageInput name="photo" />
                            <Button
                                type="submit"
                                className="my-7"
                                fullWidth
                                arrow
                                isLoading={isLoading}
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
