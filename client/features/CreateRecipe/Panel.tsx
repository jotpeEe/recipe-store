import { type FC, useCallback, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Modal, ModalMessage } from '@components';
import { useCreateRecipe, useSliderContext } from '@contexts';
import { useDeleteRecipeMutation } from '@generated/graphql';
import { type RecipeInfoInput } from '@hooks';
import Icon from '@icons';
import { updateTempRecipeData } from '@lib';
import { requestClient } from '@requests';

const Panel: FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const { id, recipe, setStep } = useCreateRecipe();

    const { step, goTo } = useSliderContext();
    const { reset } = useFormContext<RecipeInfoInput>();

    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient, {
        onSuccess({ deleteRecipe: data }) {
            updateTempRecipeData(data);

            /**
             * useFieldArray reset must be explicit
             *
             * @see https://react-hook-form.com/api/usefieldarray/#rules
             */
            reset({ ingredients: [], steps: [] });
        },
    });

    const resetForm = useCallback(() => {
        if (id) deleteRecipe({ id });
        reset();
    }, [id, recipe]);

    const handleGoBackClick = useCallback(() => {
        goTo(step - 1);
        setStep(prev => prev - 1);
    }, [step, goTo]);

    const handleClearClick = useCallback(() => {
        setOpenModal(true);
    }, [id]);

    const handleReset = useCallback(() => {
        resetForm();
        setOpenModal(false);
        goTo(0);
    }, [resetForm, goTo]);

    const handleCancel = () => setOpenModal(false);

    return (
        <div className="absolute -right-1  flex children:px-2 children:py-2">
            {step !== 0 && (
                <button
                    type="button"
                    className="rotate-180"
                    onClick={handleGoBackClick}
                >
                    <Icon name="Arrow" className="h-4" />
                </button>
            )}
            <button type="button" onClick={handleClearClick}>
                <Icon name="Clear" className="h-3" />
            </button>
            <Modal openModal={openModal} setOpenModal={setOpenModal}>
                <ModalMessage
                    title="Recipe form reset"
                    message="Are you sure you want to reset your recipe? All of your data will be permanently removed. This action cannot be undone."
                    onConfirm={handleReset}
                    onCancel={handleCancel}
                />
            </Modal>
        </div>
    );
};

export default Panel;
