import {
    type ButtonHTMLAttributes,
    type ReactNode,
    useEffect,
    useState,
} from 'react';

import cn from 'classnames';
import Link from 'next/link';

import { IconArrow } from '@components/icons';
import Spinner from '@components/Spinner';

type ButtonProps<T extends boolean> = {
    children?: ReactNode;
    href?: string;
    arrow?: boolean;
    circle?: T;
    fullWidth?: boolean;
    message?: {
        active: boolean;
        text: string;
    };
    icon?: JSX.Element;
    isLoading?: boolean;
    outlined?: boolean;
    rotate?: boolean;
    variant?:
        | 'outlined'
        | 'pure'
        | 'pure-border'
        | 'normal'
        | 'alert'
        | 'input';
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & (T extends true
    ? ButtonHTMLAttributes<HTMLButtonElement>
    : { type?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>);

const Button = <T extends boolean>({
    arrow,
    href,
    children,
    circle,
    className,
    disabled,
    fullWidth,
    icon,
    isLoading,
    outlined,
    size = 'xl',
    hidden,
    variant = 'normal',
    rotate,
    message,
    type = 'button',
    ...props
}: ButtonProps<T>): JSX.Element => {
    const [isActiveMessage, setActiveMessage] = useState(false);

    const handleCheckboxOnChange = () => {
        setActiveMessage(true);
    };

    useEffect(() => {
        const clear = setTimeout(() => {
            if (message?.active) setActiveMessage(false);
        }, 1500);

        return () => clearTimeout(clear);
    }, [isActiveMessage, message?.active]);

    const styles = cn(
        'flex items-center justify-center font-semibold gap-2 text-center transition-all h-fit border whitespace-nowrap',
        circle ? 'rounded-full p-4' : 'rounded-xl',
        size === 'xxs' && 'text-xs p-0.5',
        size === 'xs' && 'text-xs py-0.5 px-3',
        size === 'sm' && 'text-xs py-2.5 px-5 leading-none',
        size === 'md' && 'px-5 py-2',
        size === 'lg' && 'text-xs p-3',
        size === 'xl' && !circle && 'px-12 py-4',
        variant === 'pure-border' &&
            'bg-white text-secondary border-primary hover:bg-gray-100',
        variant === 'pure' &&
            'bg-white text-secondary border-white hover:bg-gray-100',
        variant === 'normal' &&
            !disabled &&
            'bg-primary text-white border-primary hover:bg-green-600',
        variant === 'outlined' &&
            'bg-white text-outlined border-outlined hover:bg-gray-100 hover:text-black',
        variant === 'alert' &&
            'bg-red-300 text-outlined border-outlined hover:bg-red-600 hover:text-black',
        variant === 'input' &&
            'bg-white text-outlined border-gray-200 hover:bg-gray-100 hover:text-black',
        disabled && 'bg-gray-200 text-gray-500',
        fullWidth ? 'w-full' : 'w-fit',
        rotate && 'rotate-180',
        hidden && 'opacity-0',
        message && 'relative',
        className && className
    );

    return (
        <>
            {!href ? (
                <button
                    type={type}
                    className={styles}
                    disabled={disabled}
                    {...props}
                >
                    {!isLoading ? (
                        <>
                            {icon && icon}
                            {children && children}
                            {arrow && <IconArrow />}
                        </>
                    ) : (
                        <Spinner color="text-amber-500" />
                    )}
                    {message && (
                        <>
                            <input
                                className="peer absolute left-0 right-0 bottom-0 top-0 z-20 opacity-0"
                                onChange={handleCheckboxOnChange}
                                type="checkbox"
                                id="btnControl"
                                disabled={message.active}
                            />
                            <label
                                htmlFor="btnControl"
                                className={cn(
                                    'ransition-opacity absolute left-1 -top-2 -translate-x-1/4 -translate-y-full rounded-3xl bg-primary px-3 py-1.5 text-black',
                                    isActiveMessage
                                        ? 'opacity-100'
                                        : 't opacity-0'
                                )}
                            >
                                <p className="relative text-[10px] font-semibold text-white before:absolute before:-bottom-2.5 before:left-1/2 before:z-10 before:h-2 before:w-2 before:-translate-x-[30%] before:rotate-45 before:rounded-sm before:bg-primary">
                                    {message.text}
                                </p>
                            </label>
                        </>
                    )}
                </button>
            ) : (
                <Link className={styles} href={href}>
                    {!isLoading ? (
                        <>
                            {icon && icon}
                            {children && children}
                            {arrow && <IconArrow />}
                        </>
                    ) : (
                        <Spinner color="text-amber-500" />
                    )}
                </Link>
            )}
        </>
    );
};

export default Button;
