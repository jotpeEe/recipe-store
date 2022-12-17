import { FC, useCallback, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { boolean, object, ref, string } from 'yup';

import { Button, FormInput } from '@components';
import { SignUpInfo } from '@components/auth';
import { ImageUpload } from '@features';
import { setUser } from '@features/auth/authSlice';
import {
    SignUpInput,
    SignUpUserMutation,
    useGetMeQuery,
    useSignUpUserMutation,
} from '@generated/graphql';
import { useAppDispatch } from '@hooks/redux';
import type { IUser } from '@lib/types';
import graphqlRequestClient from '@requests/graphqlClient';

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
    const dispatch = useAppDispatch();

    const query = useGetMeQuery(
        graphqlRequestClient,
        {},
        {
            enabled: false,
            onSuccess: data => {
                dispatch(setUser(data.getMe.user as IUser));
            },
        }
    );

    const methods = useForm<SignUpInput>({
        resolver: yupResolver(signupSchema),
    });

    const { isLoading, mutate: signUpUser } = useSignUpUserMutation<Error>(
        graphqlRequestClient,
        {
            onSuccess(data: SignUpUserMutation) {
                query.refetch();
                router.push('/');
            },
        }
    );

    const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = methods;

    const onSubmitHandler: SubmitHandler<SignUpInput> = useCallback(values => {
        signUpUser({ input: values });
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    return (
        <div className="w-full max-w-3xl">
            <div className="flex md:justify-between md:flex-row  md:items-start items-center flex-col py-header-p">
                <SignUpInfo />
                <div className="flex flex-col justify-center items-start shadow-form rounded-3xl p-8 [&>div]:pb-7 [&>a]:pb-7">
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
                            <ImageUpload name="photo" />
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