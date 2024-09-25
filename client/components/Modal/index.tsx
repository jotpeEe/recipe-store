import React, { type FC, useRef } from 'react';

import cn from 'classnames';
import ReactDom from 'react-dom';

import { useOnClickOutside } from '@hooks';

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
    const modalRef = useRef(null);

    const handleClick = () => setOpenModal(!openModal);

    useOnClickOutside(modalRef, handleClick, openModal);

    if (!openModal) return null;

    return ReactDom.createPortal(
        <>
            <div
                ref={modalRef}
                className={cn(
                    'absolute left-1/2 top-1/4 z-[300] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out',
                    openModal ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    'inset-0 z-[200]  bg-[rgba(0,0,0,.5)]',
                    target ? 'absolute rounded-xl' : 'fixed'
                )}
                onClick={() => setOpenModal(false)}
            />
        </>,
        target || (document.getElementById('root-modal') as HTMLElement)
    );
};

export default Modal;
