import { type FC, useEffect } from 'react';

import ReactDom from 'react-dom';

type IModal = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    children: React.ReactNode;
};

let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
}

// create div with id modal-root at the top of the body

const Modal: FC<IModal> = ({ openModal, setOpenModal, children }) => {
    const el = document.createElement('div');

    useEffect(() => {
        modalRoot?.appendChild(el);

        return () => {
            modalRoot?.removeChild(el);
        };
    }, []);

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
