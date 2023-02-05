import { FC, useEffect, useState } from 'react';

import classNames from 'classnames';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { IconWarning } from '@icons';

type ErrorMessageProps = {
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState<string>('&nbsp');

    useEffect(() => {
        if (error?.message) {
            setActive(true);
            setMessage(error.message as string);
        } else {
            setActive(false);
        }
    }, [error]);

    return (
        <div
            className={classNames(
                'flex gap-1 w-full items-center py-2  transition duration-700',
                active ? 'opacity-1' : 'opacity-0'
            )}
        >
            <IconWarning />
            <span className="text-xs text-red-600 max-w-[25ch]">{message}</span>
        </div>
    );
};

export default ErrorMessage;
