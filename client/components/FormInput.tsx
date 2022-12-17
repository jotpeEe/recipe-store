import { FC } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type FormInputProps = {
    label: string;
    name: string;
    padding?: boolean;
    placeholder?: string;
    type?: string;
};

const FormInput: FC<FormInputProps> = ({
    label,
    name,
    placeholder,
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
                <label
                    htmlFor={name}
                    className={classNames(
                        type === 'checkbox'
                            ? 'text-xs text-amber-500'
                            : 'text-sm',
                        padding && 'pr-9'
                    )}
                >
                    {label}
                </label>
                <input
                    type={type}
                    autoComplete="off"
                    placeholder={placeholder}
                    className={classNames(
                        'p-3 rounded-lg border text-xs',
                        type === 'checkbox'
                            ? 'w-4 h-4 accent-amber-500 text-white'
                            : 'w-full mt-2',
                        errors[name] && 'border-red-600'
                    )}
                    {...register(name)}
                />
            </div>
            <ErrorMessage error={errors[name]} />
        </div>
    );
};

export default FormInput;
