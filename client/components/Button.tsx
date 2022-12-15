import { ButtonHTMLAttributes, FC } from 'react';

import { IconArrow } from '@icons';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    small?: boolean;
    arrow?: boolean;
    fullWidth?: boolean;
};

const Button: FC<ButtonProps> = ({
    children,
    className,
    small = false,
    arrow = false,
    fullWidth = false,
    type,
}) => (
    <button
        type={type}
        className={`flex ${
            small ? 'px-5 py-2' : 'px-12 py-4'
        } items-center justify-center ${
            fullWidth ? 'w-full' : 'w-fit'
        } bg-primary gap-2 text-white font-semibold rounded-xl ${className}`}
    >
        {children}
        {arrow && <IconArrow />}
    </button>
);

export default Button;
