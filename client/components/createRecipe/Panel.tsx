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
    const dispatch = useAppDispatch();
    const id = useAppSelector(state => state.recipe?.id);

    const { mutate: deleteRecipe } = useDeleteRecipeMutation(requestClient);

    const handleGoBackClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            window.location.reload();
        }, []);

    const handleClearClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(() => {
            if (id) {
                deleteRecipe({ id });
            }

            dispatch(setRecipe({}));

            window.location.reload();
        }, [id]);

    return (
        <div className="flex absolute mr-[-8px] right-0 children:px-2 children:py-2">
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
                </>
            )}
        </div>
    );
};

export default Panel;
