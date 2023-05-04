import React, { type FC } from 'react';

import Button from '@components/Button';

type ModalMessageProps = {
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
};

const ModalMessage: FC<ModalMessageProps> = ({
    isLoading,
    onConfirm,
    onCancel,
    message,
}) => (
    <div className="rounded-xl bg-white p-4">
        <p>{message}</p>
        <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" onClick={onCancel} variant="outlined">
                Cancel
            </Button>
            <Button
                size="sm"
                type="reset"
                onClick={onConfirm}
                isLoading={isLoading}
            >
                Confirm
            </Button>
        </div>
    </div>
);

export default ModalMessage;
