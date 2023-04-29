import React, { type FC } from 'react';

import cn from 'classnames';
import ReactDom from 'react-dom';

type IPostModal = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    children: React.ReactNode;
    target?: HTMLElement;
};

const Modal: FC<IPostModal> = ({
    openModal,
    setOpenModal,
    children,
    target,
}) => {
    if (!openModal) return null;
    return ReactDom.createPortal(
        <>
            <div className="absolute left-1/2 top-1/2 z-[300] -translate-x-1/2 -translate-y-1/2">
                {children}
            </div>
            <div
                className={cn(
                    'absolute inset-0 z-[200] bg-[rgba(0,0,0,.5)]',
                    target && 'rounded-xl'
                )}
                onClick={() => setOpenModal(false)}
            />
        </>,
        target || (document.getElementById('post-modal') as HTMLElement)
    );
};

export default Modal;
