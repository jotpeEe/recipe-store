import {
    type DetailedHTMLProps,
    type FC,
    type InputHTMLAttributes,
    type KeyboardEventHandler,
    useRef,
} from 'react';

import cn from 'classnames';
import { Controller, type FieldError, useFormContext } from 'react-hook-form';

import Button from '@components/Button';
import Icon, { type IconNames } from '@icons';

import ErrorMessage from './ErrorMessage';

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    className?: string;
    errorMessage?: FieldError | undefined;
    fit?: boolean;
    icon?: {
        name: IconNames;
        position: 'start' | 'end';
    };
    name: string;
    label?: string;
    noValidation?: boolean;
    preventDef?: boolean;
    value?: string | number;
    variant?: 'edit' | 'form';
    error?: boolean | undefined;
    small?: boolean;
    type?: 'text' | 'number' | 'password' | 'email';
};

const Input: FC<InputProps> = ({
    className,
    errorMessage,
    fit,
    icon,
    label,
    name,
    error,
    preventDef,
    required,
    noValidation,
    small,
    type = 'text',
    variant = 'normal',
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        control,
        formState: { errors },
        resetField,
    } = useFormContext();

    const preventDefault: KeyboardEventHandler<HTMLInputElement> = event => {
        if (preventDef && event.key === 'Enter') {
            event?.preventDefault();
        }
    };

    const handleClearClick = () => {
        resetField(name);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, value, ...field } }) => (
                <>
                    <div
                        className={cn(
                            ' relative flex flex-col items-start justify-center',
                            fit ? 'w-fit' : 'w-full',
                            className
                        )}
                        style={props.style}
                    >
                        {label && (
                            <label
                                id={`${name}-label`}
                                className="mb-2 text-sm"
                            >
                                {label}
                            </label>
                        )}
                        <div
                            className={cn(
                                icon &&
                                    'flex items-center gap-2 rounded-lg border pl-3',
                                fit ? 'w-fit' : 'w-full'
                            )}
                        >
                            {icon && (
                                <Icon
                                    name={icon.name}
                                    className={cn('h-5 w-5 text-gray-500')}
                                />
                            )}
                            <input
                                {...props}
                                {...field}
                                value={value || ''}
                                ref={e => {
                                    ref(e);
                                    inputRef.current = e;
                                }}
                                type={type}
                                onKeyDown={preventDefault}
                                className={cn(
                                    'bg-transparent text-xs leading-5',
                                    fit ? 'w-fit' : 'w-full',
                                    small ? 'p-2' : 'p-3',
                                    variant === 'normal' && 'rounded-lg border',
                                    variant === 'edit' &&
                                        type === 'number' &&
                                        'max-w-[8ch]',
                                    variant === 'edit' &&
                                        type === 'text' &&
                                        'max-w-[19ch]',
                                    icon && 'border-none pl-0 outline-none',
                                    errors[name] || (error && 'border-red-600')
                                )}
                                aria-labelledby={`${name}-label`}
                                aria-invalid={
                                    errors?.[field.name] || error
                                        ? 'true'
                                        : 'false'
                                }
                            />
                            {icon && (
                                <Button
                                    variant="custom"
                                    size="custom"
                                    className="border-none p-2"
                                    onClick={handleClearClick}
                                    icon={
                                        <Icon
                                            name="Clear"
                                            className={cn(
                                                'h-4 w-4 text-gray-500'
                                            )}
                                        />
                                    }
                                />
                            )}
                        </div>
                    </div>
                    {!noValidation && <ErrorMessage name={name} />}
                </>
            )}
        ></Controller>
    );
};

export default Input;
