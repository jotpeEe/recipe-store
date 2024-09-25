import { type FormEventHandler, useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import {
    type SubmitHandler,
    type UseFormReturn,
    useForm,
} from 'react-hook-form';
import { type TypeOf, any, literal, object, string } from 'zod';

import { useSignUpUserMutation } from '@generated/graphql';
import { imageValidation, uploadImage } from '@lib';
import { requestClient } from '@requests';

const signupSchema = object({
    name: string()
        .min(1, 'Name is required')
        .max(24, 'Name must be less than 16 characters'),
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

export type SignUpReturnType = {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    methods: UseFormReturn<SignUpInput>;
    isLoading: boolean;
};

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const methods = useForm<SignUpInput>({
        resolver: zodResolver(signupSchema),
    });

    const { handleSubmit, reset, setError } = methods;

    const { mutate: signUpUser } = useSignUpUserMutation(requestClient, {
        onSuccess() {
            setIsLoading(false);
            reset();
            router.push('/profile');
        },
        onError(error: any) {
            error.response.errors.forEach((e: any) => {
                const { message } = e;
                setError('email', { message });
            });
        },
    });

    const onSubmitHandler: SubmitHandler<SignUpInput> = useCallback(
        async values => {
            setIsLoading(true);
            const data = await uploadImage(values.photo?.[0]);
            const input = { ...values, photo: data };
            signUpUser({ input });
        },
        []
    );

    return {
        handleSubmit: handleSubmit(onSubmitHandler),
        methods,
        isLoading,
    };
};

export default useSignup;
