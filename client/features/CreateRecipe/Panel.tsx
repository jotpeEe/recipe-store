import { type FC, type MouseEventHandler, useCallback, useState } from 'react';

import { Modal, ModalMessage } from '@components';
import { useCreateRecipe, useSliderContext } from '@contexts';
import { IconArrow, IconClear } from '@icons';

const Panel: FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const { id, resetForm, setStep } = useCreateRecipe();

    const { step, goTo } = useSliderContext();

    const handleGoBackClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            goTo(step - 1);
            setStep(prev => prev - 1);
        }, [step]);

    const handleClearClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            setOpenModal(true);
        }, [id]);

    const onReset = () => {
        resetForm();
        setOpenModal(false);
        goTo(0);
    };

    const onCancel = () => setOpenModal(false);
    return (
        <div className="absolute right-0 -mr-[-24px] flex children:px-2 children:py-2">
            {step !== 0 && (
                <button
                    type="button"
                    className="rotate-180"
                    onClick={handleGoBackClick}
                >
                    <IconArrow />
                </button>
            )}
            <button type="button" onClick={handleClearClick}>
                <IconClear />
            </button>
            <Modal openModal={openModal} setOpenModal={setOpenModal}>
                <ModalMessage
                    message="Do you want to reset the form?"
                    onConfirm={onReset}
                    onCancel={onCancel}
                />
            </Modal>
        </div>
    );
};

export default Panel;
