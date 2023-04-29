import {
    type DetailedHTMLProps,
    type FC,
    type InputHTMLAttributes,
} from 'react';

import cn from 'classnames';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    className?: string;
    name: string;
    label?: string;
    noValidation?: boolean;
    value?: string | number;
    error?: boolean | undefined;
    type?: 'text' | 'number' | 'password' | 'email';
};

const Input: FC<InputProps> = ({
    className,
    label,
    name,
    value,
    error,
    required,
    noValidation,
    type = 'text',
    ...props
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div
                className={cn(
                    'flex w-full flex-col items-start justify-center text-sm',
                    className
                )}
            >
                {label && (
                    <label id={`${name}-label`} className="mb-2 text-sm">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    defaultValue={value}
                    className={cn(
                        'w-full rounded-lg border p-3 text-xs',
                        errors[name] || (error && 'border-red-600')
                    )}
                    {...props}
                    {...register(name, {
                        required: required && 'This field is required',
                    })}
                    aria-labelledby={`${name}-label`}
                    aria-invalid={errors?.[name] || error ? 'true' : 'false'}
                />
            </div>
            {!noValidation && <ErrorMessage error={errors[name]} />}
        </>
    );
};

export default Input;
