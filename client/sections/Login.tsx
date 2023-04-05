import { type FC, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'zod';

import { AuthFooter, Button, Input } from '@components';
import { type LoginInput, useLoginUserMutation } from '@generated/graphql';
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
        <div className="flex w-screen justify-center md:w-[750px] md:items-center">
            <div className="flex h-fit flex-col items-start justify-center rounded-3xl p-4 shadow-form min-[375px]:p-8 [&>div]:pb-7 [&>a]:pb-7">
                <div className="flex flex-col items-start justify-center">
                    <h3>Hello,</h3>
                    Welcome back!
                </div>
                <FormProvider {...methods}>
                    <form
                        className="w-full"
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                    >
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
