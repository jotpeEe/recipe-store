import { FC, useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';

import { Button, FormInput, AuthFooter } from '@components';
import { LoginInput, useLoginUserMutation } from '@generated/graphql';
import { requestClient } from '@requests';

const loginSchema = object({
    email: string()
        .min(1, 'Email address is required')
        .email('Email address is invalid'),
    password: string()
        .required('Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

/**
 * Login: The Login page of the web app
 * @return {JSX.Element} The JSX Code for the Login Page
 */

const Login: FC = () => {
    const router = useRouter();

    const methods = useForm<LoginInput>({ resolver: yupResolver(loginSchema) });

    const { handleSubmit, setError } = methods;

    const { isLoading, mutate: loginUser } = useLoginUserMutation<Error>(
        requestClient,
        {
            onSuccess() {
                router.push('/profile');
            },
            onError(error: any) {
                error.response.errors.forEach((e: any) => {
                    const { message } = e;
                    if (message.includes('password')) {
                        setError('password', { message });
                    } else {
                        setError('email', { message });
                    }
                });
            },
        }
    );

    const onSubmitHandler: SubmitHandler<LoginInput> = useCallback(values => {
        loginUser({ input: values });
    }, []);

    return (
        <div className="flex justify-center md:items-center w-full">
            <div className="flex flex-col justify-center items-start shadow-form h-fit rounded-3xl p-8 [&>div]:pb-7 [&>a]:pb-7">
                <div className="flex flex-col justify-center items-start">
                    <h3>Hello,</h3>
                    Welcome back!
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
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
                        <Link className="flex w-fit" href="">
                            <h6 className="text-amber-500">Forgot password?</h6>
                        </Link>
                        <Button
                            type="submit"
                            className="my-7"
                            fullWidth
                            arrow
                            isLoading={isLoading}
                        >
                            Log in
                        </Button>
                    </form>
                </FormProvider>
                <AuthFooter type="login" />
            </div>
        </div>
    );
};

export default Login;
