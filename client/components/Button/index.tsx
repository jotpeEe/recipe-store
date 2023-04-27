import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import { IconArrow } from '@icons';

import Spinner from '../Spinner';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    href?: string;
    arrow?: boolean;
    circle?: boolean;
    fullWidth?: boolean;
    icon?: JSX.Element;
    isLoading?: boolean;
    outlined?: boolean;
    rotate?: boolean;
    variant?: 'outlined' | 'pure' | 'normal' | 'alert' | 'input';
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
};

const Button: FC<ButtonProps> = ({
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
    rotate,
    size = 'lg',
    type = 'button',
    hidden,
    variant = 'normal',
    ...props
}) => {
    const styles = classNames(
        'flex items-center justify-center font-semibold gap-2 text-center transition-all h-fit border',
        circle ? 'rounded-full p-4' : 'rounded-xl',
        size === 'xxs' && 'text-xs p-0.5',
        size === 'xs' && 'text-xs py-0.5 px-3',
        size === 'sm' && 'text-xs py-2.5 px-5 leading-none',
        size === 'md' && 'px-5 py-2',
        size === 'lg' && !circle && 'px-12 py-4',
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
