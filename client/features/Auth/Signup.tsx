import { type FC } from 'react';

import { FormProvider } from 'react-hook-form';

import { Button, Checkbox, ImageInput, Input, SignUpInfo } from '@components';
import { useAuth } from '@hooks';

/**
 * SignUp: The SignUp component used with auth route of the app.
 * @return {JSX.Element} The JSX Code for the SignUp Page
 */

const SignUp: FC = (): JSX.Element => {
    const { methods, handleSubmit, isLoading } = useAuth('signup');

    return (
        <div className="mx-auto flex w-screen items-center justify-center py-2 md:w-full">
            <div className="flex flex-col items-center  md:flex-row md:items-start md:justify-between">
                <SignUpInfo />
                <div className="flex flex-col items-start justify-center rounded-3xl p-8 shadow-form [&>div]:pb-7 [&>a]:pb-7">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit} noValidate>
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
                                className="space-y-7"
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
