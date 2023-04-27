import { type ReactNode } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

const MockedForm = ({ children }: { children: ReactNode }) => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = jest.fn();

    return (
        <FormProvider {...methods}>
            <form className="w-[200px]" onSubmit={handleSubmit(onSubmit)}>
                {children}
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};

export default MockedForm;
