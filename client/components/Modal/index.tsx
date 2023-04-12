import { type FC, useEffect } from 'react';

import ReactDom from 'react-dom';

type IModal = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    children: React.ReactNode;
};

const Modal: FC<IModal> = ({ openModal, setOpenModal, children }) => {
    const el = document.createElement('div');

    // create div with id modal-root at the top of the body, useEffect for client side only
    useEffect(() => {
        let modalRoot = document.getElementById('modal-root');

        if (!modalRoot && openModal) {
            modalRoot = document.createElement('div');
            modalRoot.setAttribute('id', 'modal-root');
            document.body.appendChild(modalRoot);
        }

        modalRoot?.appendChild(el);

        return () => {
            modalRoot?.removeChild(el);
        };
    }, [openModal]);

    if (!openModal) return null;

    return ReactDom.createPortal(
        <>
            <div
                className="fixed inset-0 z-[1000] bg-[rgba(0,0,0,.5)]"
                onClick={() => setOpenModal(false)}
            />
            <div className="w-fill fixed left-1/2 top-[15%] z-[1001] max-w-lg -translate-x-1/2 rounded-md bg-white p-6">
                {children}
            </div>
        </>,
        el
    );
};

export default Modal;
