import { type FC } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type CheckboxProps = {
    name: string;
    value?: string | number;
    autoComplete?: 'on' | 'off';
    label?: string;
    placeholder?: string;
    noValidation?: boolean;
};

const Checkbox: FC<CheckboxProps> = ({
    name,
    value,
    autoComplete = 'off',
    label,
    placeholder,
    noValidation,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div className="flex w-full flex-row-reverse items-center justify-end gap-2 text-sm">
                {label && (
                    <label
                        htmlFor={name}
                        className="pr-9 text-xs text-amber-500"
                    >
                        {label}
                    </label>
                )}

                <input
                    type="checkbox"
                    defaultValue={value}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className={classNames(
                        'h-4 w-4 min-w-max rounded-lg border p-3 text-xs text-white accent-amber-500',
                        errors[name] && 'border-red-600'
                    )}
                    {...register(name)}
                />
            </div>
            {!noValidation && <ErrorMessage name={name} />}
        </>
    );
};

export default Checkbox;
