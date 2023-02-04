import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import { IconArrow } from '@icons';

import Spinner from './Spinner';

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
    size?: 'xs' | 'sm' | 'md' | 'lg';
};

const Button: FC<ButtonProps> = ({
    arrow,
    href,
    children,
    circle,
    className,
    fullWidth,
    icon,
    isLoading,
    outlined,
    rotate,
    size = 'lg',
    type,
    hidden,
    ...props
}) => {
    const styles = classNames(
        'flex items-center justify-center bg-primary gap-2 text-white font-semibold text-center transition-all h-fit',
        circle
            ? 'rounded-full p-4 text-black border border-black bg-white '
            : 'rounded-xl',
        size === 'xs' && !circle && 'text-xs py-0.5 px-3',
        size === 'sm' && !circle && 'text-xs py-2 px-5 leading-none',
        size === 'sm' && outlined && !circle && 'font-normal',
        size === 'md' && !circle && 'px-5 py-2',
        size === 'lg' && !circle && 'px-12 py-4',
        fullWidth ? 'w-full' : 'w-fit',
        outlined && !circle
            ? 'bg-white text-outlined border'
            : 'bg-primary text-white hover:bg-green-600',
        rotate && 'rotate-180',
        (outlined || circle) && 'hover:bg-gray-200',
        hidden && 'opacity-0',
        className && `${className}`
    );

    return (
        <>
            {!href ? (
                <button type={type} className={styles} {...props}>
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
