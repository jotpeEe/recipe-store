import type { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';

import cn from 'classnames';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

type TextAreaProps = DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    error?: boolean;
    name: string;
    label?: string;
    noValidation?: boolean;
    value?: string | number;
    small?: boolean;
};

const TextArea: FC<TextAreaProps> = ({
    error,
    label,
    name,
    value,
    noValidation,
    rows,
    small = false,
    ...props
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div className="flex w-full flex-col items-start justify-center text-sm">
                {label && (
                    <label htmlFor={name} className="mb-2 w-full text-sm">
                        {label}
                    </label>
                )}
                <textarea
                    defaultValue={value}
                    rows={rows || 4}
                    className={cn(
                        'w-full resize-none rounded-lg border text-xs',
                        small ? 'p-2' : 'p-3',
                        errors[name] || (error && 'border-red-600')
                    )}
                    {...props}
                    {...register(name)}
                />
            </div>
            {!noValidation && <ErrorMessage name={name} />}
        </>
    );
};

export default TextArea;
