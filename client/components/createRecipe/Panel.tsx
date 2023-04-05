import { type FC, type MouseEventHandler, useCallback, useState } from 'react';

import Button from '@components/Button';
import Modal from '@components/Modal';
import { useSliderContext } from '@contexts';
import { useDeleteRecipeMutation } from '@generated/graphql';
import { useAppDispatch, useAppSelector } from '@hooks';
import { IconArrow, IconClear } from '@icons';
import { setRecipe } from '@redux';
import { queryClient, requestClient } from '@requests';

type PanelProps = {
    first?: boolean;
};

const Panel: FC<PanelProps> = ({ first = false }) => {
    const [openPostModal, setOpenPostModal] = useState(false);

    const { step, goTo } = useSliderContext();
    const dispatch = useAppDispatch();

    const id = useAppSelector(state => state.recipe?.id);

    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries('GetTempRecipe');
        },
    });

    const handleGoBackClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            goTo(step - 1);
        }, [step]);

    const handleClearClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            setOpenPostModal(true);
        }, [id]);

    const onReset: MouseEventHandler<HTMLButtonElement> =
        useCallback(async () => {
            if (id) {
                await deleteRecipe({ id });
            }
            dispatch(setRecipe({}));
            setOpenPostModal(false);
            goTo(0);
        }, [id]);

    const onCancel: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        setOpenPostModal(false);
    }, []);

    return (
        <div className="absolute right-0 mr-[-8px] flex children:px-2 children:py-2">
            {!first && (
                <>
                    <button
                        type="button"
                        className="rotate-180"
                        onClick={handleGoBackClick}
                    >
                        <IconArrow />
                    </button>

                    <button type="button" onClick={handleClearClick}>
                        <IconClear />
                    </button>
                    <Modal
                        openPostModal={openPostModal}
                        setOpenPostModal={setOpenPostModal}
                    >
                        <>
                            <p>Do you want to reset create form?</p>
                            <div className="flex justify-end gap-2 pt-2">
                                <Button
                                    size="sm"
                                    onClick={onCancel}
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                                <Button size="sm" onClick={onReset}>
                                    Reset
                                </Button>
                            </div>
                        </>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Panel;
