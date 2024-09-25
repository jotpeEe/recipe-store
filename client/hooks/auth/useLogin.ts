import { type FormEventHandler, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import {
    type SubmitHandler,
    type UseFormReturn,
    useForm,
} from 'react-hook-form';
import { object, string } from 'zod';

import { type LoginInput, useLoginUserMutation } from '@generated/graphql';
import { requestClient } from '@requests';

export type LoginReturnType = {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    methods: UseFormReturn<LoginInput>;
    isLoading: boolean;
};

const loginSchema = object({
    email: string()
        .min(1, 'Email address is required')
        .email('Email address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(6, 'Password must be more than 6 characters')
        .max(16, 'Password must be less than 16 characters'),
});

const useLogin = () => {
    const router = useRouter();

    const methods = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
    const { handleSubmit, setError } = methods;

    const { isLoading, mutate: loginUser } = useLoginUserMutation<Error>(
        requestClient,
        {
            onSuccess() {
                router.back();
            },
            onError(error: any) {
                error.response.errors.forEach(({ message }: any) => {
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

    return {
        handleSubmit: handleSubmit(onSubmitHandler),
        methods,
        isLoading,
    };
};

export default useLogin;
