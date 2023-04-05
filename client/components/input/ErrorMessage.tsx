import { type FC, useEffect, useState } from 'react';

import classNames from 'classnames';
import {
    type FieldError,
    type FieldErrorsImpl,
    type Merge,
} from 'react-hook-form';

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
                'flex w-full items-center gap-1 py-2  transition duration-700',
                active ? 'opacity-1' : 'opacity-0'
            )}
        >
            <IconWarning />
            <span className="max-w-[30ch] break-words text-xs text-red-600">
                {message}
            </span>
        </div>
    );
};

export default ErrorMessage;
