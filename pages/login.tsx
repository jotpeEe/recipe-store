import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';

import { Button, FormInput } from '@components';
import {
    LoginInput,
    useGetMeQuery,
    useLoginUserMutation,
} from '@generated/graphql';
import { IconFacebook, IconGoogle } from '@icons';
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
            onSuccess: data => {
                console.log(data);
            },
        }
    );

    const { mutate: loginUser } = useLoginUserMutation<Error>(
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
                                fullWidth
                                arrow
                            >
                                Log in
                            </Button>
                        </form>
                    </FormProvider>
                    <div className="w-full flex justify-center items-center before:w-10 before:h-px before:mr-2 before:bg-gray-300 after:w-10 after:h-px after:ml-2 after:bg-gray-300 text-gray-300">
                        <h6>Or Sign in with</h6>
                    </div>
                    <div className="w-full flex gap-7 justify-center">
                        <a href="" className="p-2.5 rounded-xl border">
                            <IconGoogle />
                        </a>
                        <a href="" className="p-2.5 rounded-xl border">
                            <IconFacebook />
                        </a>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <h6>{`Don't have account? `}</h6>{' '}
                        <a href="" className="px-2 py-1">
                            <h6 className="text-amber-500"> Sign up</h6>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
