import { type FC } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type SelectProps = {
    options: string[];
    name: string;
    label?: string;
    noValidation?: boolean;
    placeholder?: string;
};

const Select: FC<SelectProps> = ({
    label,
    name,
    noValidation,
    options,
    placeholder,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div
                className={classNames(
                    'flex w-full flex-col items-start justify-center text-sm'
                )}
            >
                {label && (
                    <label
                        htmlFor={name}
                        className={classNames('mb-2 pr-9 text-sm')}
                    >
                        {label}
                    </label>
                )}
                <select
                    placeholder={placeholder}
                    className="w-full rounded-lg border bg-white p-3 text-xs"
                    {...register(name)}
                >
                    <option className="text-xs font-bold" value="Choose">
                        Choose cuisine
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                    <option value="Other">Other</option>
                </select>
                {!noValidation && <ErrorMessage error={errors[name]} />}
            </div>
        </>
    );
};

export default Select;
