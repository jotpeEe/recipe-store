import React, { type FC } from 'react';

import ReactDom from 'react-dom';

type IPostModal = {
    openPostModal: boolean;
    setOpenPostModal: (openPostModal: boolean) => void;
    children: React.ReactNode;
};

const PostModal: FC<IPostModal> = ({
    openPostModal,
    setOpenPostModal,
    children,
}) => {
    if (!openPostModal) return null;
    return ReactDom.createPortal(
        <>
            <div
                className="fixed inset-0 z-[1000] bg-[rgba(0,0,0,.5)]"
                onClick={() => setOpenPostModal(false)}
            />
            <div className="w-fill fixed top-[15%] left-1/2 z-[1001] max-w-lg -translate-x-1/2 rounded-md bg-white p-6">
                {children}
            </div>
        </>,
        document.getElementById('post-modal') as HTMLElement
    );
};

export default PostModal;