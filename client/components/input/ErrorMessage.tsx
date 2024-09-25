import React, { type FC, useEffect, useState } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import Icon from '@icons';

type ErrorMessageProps = {
    name: string;
    noPadding?: boolean;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ name, noPadding }) => {
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState<string>('&nbsp');
    const {
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        if (errors?.[name]) {
            if (Array.isArray(errors?.[name])) {
                setMessage('No empty fields required');
            } else {
                setMessage(errors?.[name]?.message as string);
            }
            setActive(true);
        } else {
            setActive(false);
        }
    }, [errors?.[name], errors]);

    return (
        <div
            className={classNames(
                'flex w-full items-center gap-1 transition duration-700',
                active ? 'opacity-1' : 'opacity-0',
                noPadding ? '' : 'py-2'
            )}
        >
            <Icon name="Warning" />
            <span className="max-w-[30ch] break-words text-xs text-red-600">
                {message}
            </span>
        </div>
    );
};

export default ErrorMessage;
