import React, { type FC, useCallback, useEffect } from 'react';

import router from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { type UpdateInput, useUpdateRecipeMutation } from '@generated/graphql';
import { useKeyPress } from '@hooks';
import { type RecipeProps } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import Recipe from './Recipe';

const RecipeView: FC<RecipeProps> = props => {
    const isEnterPressed = useKeyPress('Enter');
    const { id, title, prep, description, ingredients } = props;

    const methods = useForm<UpdateInput>({
        defaultValues: {
            title,
            prep,
            description,
            ingredients,
        },
    });
    const {
        reset,
        handleSubmit,
        formState: { isDirty },
    } = methods;

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries(['GetRecipeById', { id }]);
        },
        onError(error: any) {
            if (error.response.errors[0].message === 'No access token found') {
                router.push('/auth');
            }
        },
    });

    const onSubmit: SubmitHandler<UpdateInput> = useCallback(
        input => {
            if (id) {
                updateRecipe({ id, input });
            }
        },
        [id, isDirty, isEnterPressed]
    );

    useEffect(() => {
        if (isEnterPressed && isDirty) handleSubmit(onSubmit)();
    }, [isEnterPressed, isDirty]);

    return (
        <>
            {props.withEdit ? (
                <FormProvider {...methods}>
                    <form>
                        <Recipe
                            {...props}
                            onSubmit={onSubmit}
                            isEnterPressed={isEnterPressed}
                        />
                    </form>
                </FormProvider>
            ) : (
                <Recipe {...props} />
            )}
        </>
    );
};

export default RecipeView;
