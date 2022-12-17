import { ButtonHTMLAttributes, FC } from 'react';

import classNames from 'classnames';

import { IconArrow } from '@icons';

import Spinner from './Spinner';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'small' | 'medium' | 'large';
    arrow?: boolean;
    outlined?: boolean;
    fullWidth?: boolean;
    icon?: JSX.Element;
    isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({
    children,
    className,
    isLoading = false,
    size = 'large',
    outlined = false,
    arrow = false,
    fullWidth = false,
    type = 'button',
    icon,
}) => (
    <button
        type={type}
        className={classNames(
            'flex items-center justify-center bg-primary gap-2 text-white font-semibold rounded-xl hover:bg-green-600 transition-all',
            size === 'small' && 'text-xs py-2 px-5 ',
            size === 'small' && outlined && 'font-normal',
            size === 'medium' && 'px-5 py-2',
            size === 'large' && 'px-12 py-4',
            fullWidth ? 'w-full' : 'w-fit',
            outlined
                ? 'bg-white text-outlined border'
                : 'bg-primary text-white',
            className && `${className}`
        )}
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
);

export default Button;
