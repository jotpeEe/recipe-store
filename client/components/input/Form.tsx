import { FC } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type FormInputProps = {
    autoComplete?: 'on' | 'off';
    name: string;
    label?: string;
    padding?: boolean;
    placeholder?: string;
    type?: 'text' | 'number' | 'checkbox' | 'email' | 'password';
    element?: 'input' | 'textarea' | 'select';
    noValidation?: boolean;
    value?: string | number;
};

const FormInput: FC<FormInputProps> = ({
    element = 'input',
    label,
    name,
    value,
    autoComplete = 'off',
    placeholder,
    padding = false,
    type = 'text',
    noValidation,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div
                className={classNames(
                    'text-sm flex',
                    type === 'checkbox'
                        ? 'items-center w-full justify-end gap-2 flex-row-reverse'
                        : 'flex-col justify-center items-start',
                    padding && 'py-2'
                )}
            >
                {label && (
                    <label
                        htmlFor={name}
                        className={classNames(
                            type === 'checkbox'
                                ? 'text-xs text-amber-500'
                                : 'text-sm mb-2',
                            padding && 'pr-9'
                        )}
                    >
                        {label}
                    </label>
                )}
                {element === 'textarea' && (
                    <textarea
                        defaultValue={value}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        rows={4}
                        className={classNames(
                            'p-3 rounded-lg border text-xs w-full resize-none',
                            errors[name] && 'border-red-600'
                        )}
                        {...register(name)}
                    />
                )}
                {element === 'input' && (
                    <input
                        type={type}
                        defaultValue={value}
                        autoComplete="off"
                        placeholder={placeholder}
                        className={classNames(
                            'p-3 rounded-lg border min-w-max text-xs',
                            type === 'checkbox'
                                ? 'w-4 h-4 accent-amber-500 text-white'
                                : 'w-full',
                            errors[name] && 'border-red-600'
                        )}
                        {...register(name)}
                    />
                )}
            </div>
            {!noValidation && <ErrorMessage error={errors[name]} />}
        </>
    );
};

export default FormInput;
