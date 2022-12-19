import { FC } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type FormInputProps = {
    name: string;
    label?: string;
    padding?: boolean;
    placeholder?: string;
    type?: string;
    noValidation?: boolean;
};

const FormInput: FC<FormInputProps> = ({
    label,
    name,
    placeholder,
    noValidation = false,
    padding = false,
    type = 'text',
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
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
                <input
                    type={type}
                    autoComplete="off"
                    placeholder={placeholder}
                    className={classNames(
                        'p-3 rounded-lg border text-xs',
                        type === 'checkbox'
                            ? 'w-4 h-4 accent-amber-500 text-white'
                            : 'w-full',
                        errors[name] && 'border-red-600'
                    )}
                    {...register(name)}
                />
            </div>
            {!noValidation && <ErrorMessage error={errors[name]} />}
        </div>
    );
};

export default FormInput;
