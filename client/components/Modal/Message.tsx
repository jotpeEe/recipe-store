import React, { type FC } from 'react';

import cn from 'classnames';

type ModalMessageProps = {
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
    title?: string;
};

const ModalMessage: FC<ModalMessageProps> = ({
    isLoading,
    onConfirm,
    onCancel,
    message,
    title,
}) => (
    <>
        {/* <div className="rounded-xl bg-white p-4">
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
        </div> */}
        <div
            className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle md:min-w-[320px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
        >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                            className="h-6 w-6 text-red-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                            className="text-lg font-medium leading-6 text-gray-900"
                            id="modal-headline"
                        >
                            {title}
                        </h3>
                        <div className={cn(title && 'mt-2')}>
                            <p className="text-sm text-gray-500">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    tabIndex={0}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
                <button
                    type="button"
                    tabIndex={0}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    </>
);

export default ModalMessage;
