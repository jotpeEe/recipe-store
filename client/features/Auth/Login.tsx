import { type FC } from 'react';

import Link from 'next/link';
import { FormProvider } from 'react-hook-form';

import { Button, ControlPanel, Input } from '@components';
import { useAuth } from '@hooks';

/**
 * Login: The Login page of the web app
 * @return {JSX.Element} The JSX Code for the Login Page
 */

const Login: FC = () => {
    const { isLoading, handleSubmit, methods } = useAuth('login');

    return (
        <div className="flex w-screen justify-center md:w-[750px] md:items-center">
            <div className="flex h-fit flex-col items-start justify-center rounded-3xl p-4 shadow-form min-[375px]:p-8 [&>div]:pb-7 [&>a]:pb-7">
                <div className="flex flex-col items-start justify-center">
                    <h3>Hello,</h3>
                    Welcome back!
                </div>
                <FormProvider {...methods}>
                    <form className="w-full" onSubmit={handleSubmit} noValidate>
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
                <ControlPanel variant="login" />
            </div>
        </div>
    );
};

export default Login;
