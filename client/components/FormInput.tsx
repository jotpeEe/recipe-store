import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type FormInputProps = {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
};

const FormInput: FC<FormInputProps> = ({
    label,
    name,
    placeholder,
    type = 'text',
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="w-full text-sm flex flex-col justify-center items-start">
            <label htmlFor={name} className="text-sm">
                {label}
            </label>
            <input
                type={type}
                autoComplete="off"
                placeholder={placeholder}
                className={`p-3 mt-2 rounded-lg border text-xs w-full ${
                    errors[name] ? 'border-red-600' : ''
                } `}
                {...register(name)}
            />
            <ErrorMessage error={errors[name]} />
        </div>
    );
};

export default FormInput;
