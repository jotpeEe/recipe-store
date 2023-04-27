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
};

const TextArea: FC<TextAreaProps> = ({
    error,
    label,
    name,
    value,
    noValidation,
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
                    <label htmlFor={name} className={'mb-2 text-sm'}>
                        {label}
                    </label>
                )}
                <textarea
                    defaultValue={value}
                    rows={4}
                    className={cn(
                        'w-full resize-none rounded-lg border p-3 text-xs',
                        errors[name] || (error && 'border-red-600')
                    )}
                    {...props}
                    {...register(name)}
                />
            </div>
            {!noValidation && <ErrorMessage error={errors[name]} />}
        </>
    );
};

export default TextArea;
