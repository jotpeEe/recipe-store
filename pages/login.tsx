import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';

import { Button, FormInput } from '@components';
import { Footer } from '@components/auth';
import {
    LoginInput,
    useGetMeQuery,
    useLoginUserMutation,
} from '@generated/graphql';
import { PageLayout as Layout } from '@layouts';
import graphqlRequestClient from '@requests/graphqlClient';

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

const Login: NextPage = () => {
    const router = useRouter();

    const methods = useForm<LoginInput>({ resolver: yupResolver(loginSchema) });

    const { handleSubmit } = methods;

    const query = useGetMeQuery(
        graphqlRequestClient,
        {},
        {
            enabled: false,
            onSuccess: data => {},
        }
    );

    const { isLoading, mutate: loginUser } = useLoginUserMutation<Error>(
        graphqlRequestClient,
        {
            onSuccess() {
                query.refetch();
                router.push('/');
            },
        }
    );

    const onSubmitHandler: SubmitHandler<LoginInput> = values => {
        loginUser({ input: values });
    };

    return (
        <Layout>
            <div className="py-header-p">
                <div className="flex flex-col justify-center items-start shadow-form rounded-3xl p-8 [&>div]:pb-7 [&>a]:pb-7">
                    <div className="flex flex-col justify-center items-start">
                        <h3>Hello,</h3>
                        Welcome back!
                    </div>
                    <FormProvider {...methods}>
                        <form
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
                                <h6 className="text-amber-500">
                                    Forgot password?
                                </h6>
                            </Link>
                            <Button
                                type="submit"
                                className="my-7"
                                isLoading={isLoading}
                                fullWidth
                                arrow
                            >
                                Log in
                            </Button>
                        </form>
                    </FormProvider>
                    <Footer type="login" />
                </div>
            </div>
        </Layout>
    );
};

export default Login;
