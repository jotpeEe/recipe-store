import { type FC, type MouseEventHandler, useCallback, useState } from 'react';

import { Button, Modal } from '@components';
import { useCreateRecipe, useSliderContext } from '@contexts';
import { IconArrow, IconClear } from '@icons';

const Panel: FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const { id, resetForm } = useCreateRecipe();

    const { step, goTo } = useSliderContext();

    const handleGoBackClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            goTo(step - 1);
        }, [step]);

    const handleClearClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            setOpenModal(true);
        }, [id]);

    const onReset: MouseEventHandler<HTMLButtonElement> =
        useCallback(async () => {
            resetForm();
            setOpenModal(false);
            goTo(0);
        }, [id]);

    const onCancel: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        setOpenModal(false);
    }, []);

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
                <>
                    <p>Do you want to reset create form?</p>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button size="sm" onClick={onCancel} variant="outlined">
                            Cancel
                        </Button>
                        <Button size="sm" type="reset" onClick={onReset}>
                            Reset
                        </Button>
                    </div>
                </>
            </Modal>
        </div>
    );
};

export default Panel;
