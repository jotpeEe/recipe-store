import {
    type ButtonHTMLAttributes,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

import Link from 'next/link';

import Spinner from '@components/Spinner';
import Icon from '@icons';
import { cn } from '@lib/utils';
import useCheckTextWidth from 'client/hooks/useCheckTextWidth';

type ButtonProps<T extends boolean> = {
    arrow?: boolean;
    children?: ReactNode;
    circle?: T;
    description?: string;
    fullWidth?: boolean;
    href?: string;
    icon?: JSX.Element;
    isLoading?: boolean;
    justify?: 'left' | 'center';
    message?: {
        active: boolean;
        text: string;
    };
    outlined?: boolean;
    rotate?: boolean;
    shape?: 'circle' | 'square';
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
    tooltip?: string;
    variant?:
        | 'outlined'
        | 'pure'
        | 'pure-border'
        | 'custom'
        | 'normal'
        | 'alert'
        | 'input';
} & (T extends true
    ? ButtonHTMLAttributes<HTMLButtonElement>
    : { type?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>);

const Button = <T extends boolean>({
    arrow,
    children,
    circle,
    className,
    disabled,
    fullWidth,
    hidden,
    href,
    icon,
    isLoading,
    justify = 'center',
    message,
    outlined,
    rotate,
    shape,
    size = shape ? undefined : 'xl',
    tooltip,
    type = 'button',
    variant = 'normal',
    ...props
}: ButtonProps<T>): JSX.Element => {
    const [isActiveMessage, setActiveMessage] = useState(false);

    const textElementRef = useRef(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [translate, setTranslate] = useState(0);

    const {
        style: { width },
    } = useCheckTextWidth<HTMLDivElement>(textElementRef, tooltip);

    const handleCheckboxOnChange = () => {
        setActiveMessage(true);
    };

    useEffect(() => {
        if (buttonRef.current) {
            const calc = width / 2 - buttonRef.current.offsetWidth / 2;
            setTranslate(calc);
        }
    }, [buttonRef.current]);

    useEffect(() => {
        const clear = setTimeout(() => {
            if (message?.active) setActiveMessage(false);
        }, 1500);

        return () => clearTimeout(clear);
    }, [isActiveMessage, message?.active]);

    const styles = cn(
        'peer flex items-center font-semibold gap-2 text-center transition-all h-fit border whitespace-nowrap',
        circle ? 'rounded-full' : 'rounded-md',
        className && className,
        disabled && 'bg-gray-200 text-gray-500',
        fullWidth ? 'w-full' : 'w-fit',
        hidden && 'opacity-0',
        justify !== 'left' && 'justify-center',
        shape === 'square' && 'p-2',
        size === 'xxs' && 'text-xs p-1',
        size === 'xs' && 'text-xs py-0.5 px-3',
        size === 'sm' && 'text-xs py-2.5 px-5 leading-none',
        size === 'md' && 'px-5 py-2',
        size === 'lg' && 'text-xs p-3',
        size === 'xl' && 'px-12 py-4',
        variant === 'pure-border' && 'bg-white border hover:bg-gray-100',
        variant === 'pure' && 'bg-white border-white hover:bg-gray-100',
        variant === 'normal' &&
            !disabled &&
            'bg-primary text-white border-primary hover:bg-green-600',
        variant === 'outlined' &&
            'bg-white text-outlined border-outlined hover:bg-gray-100 hover:text-black',
        variant === 'alert' &&
            'bg-red-300 text-outlined border-outlined hover:bg-red-600 hover:text-black',
        variant === 'input' &&
            'bg-white text-outlined border-gray-200 hover:bg-gray-100 hover:text-black',
        message && 'relative',
        rotate && 'rotate-180'
    );

    return (
        <>
            {!href ? (
                <div className="group relative">
                    <button
                        ref={buttonRef}
                        type={type}
                        className={styles}
                        disabled={disabled}
                        {...props}
                    >
                        {!isLoading ? (
                            <>
                                {icon && icon}
                                {children && children}
                                {arrow && (
                                    <Icon
                                        name="Arrow"
                                        className="transition-transform group-hover:translate-x-1"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                    />
                                )}
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
                                            : 'opacity-0'
                                    )}
                                >
                                    <p className="relative text-[10px] font-semibold text-white before:absolute before:-bottom-2.5 before:left-1/2 before:z-10 before:h-2 before:w-2 before:-translate-x-[30%] before:rotate-45 before:rounded-sm before:bg-primary">
                                        {message.text}
                                    </p>
                                </label>
                            </>
                        )}
                    </button>
                    {tooltip && (
                        <div
                            ref={textElementRef}
                            className="absolute -bottom-9 left-0 whitespace-nowrap rounded-md bg-gray-500 p-1.5 text-[10px] font-semibold tracking-wide text-white opacity-0 transition-opacity duration-500 before:absolute before:-top-1 before:left-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:rotate-45 before:rounded-sm before:bg-gray-500 peer-hover:opacity-100"
                            style={{ transform: `translateX(-${translate}px)` }}
                        >
                            {tooltip}
                        </div>
                    )}
                </div>
            ) : (
                <Link className={styles} href={href}>
                    {!isLoading ? (
                        <>
                            {icon && icon}
                            {children && children}
                            {arrow && <Icon name="Arrow" />}
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
