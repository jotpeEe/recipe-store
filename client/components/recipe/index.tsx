import { type FC, useCallback, useEffect } from 'react';

import classNames from 'classnames';
import { hasCookie } from 'cookies-next';
import router from 'next/router';
import {
    FormProvider,
    type SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';

import { AnimatedDiv as Animated } from '@components/animations';
import { UserInfo } from '@components/user';
import { RecipeContext } from '@contexts';
import { type UpdateInput, useUpdateRecipeMutation } from '@generated/graphql';
import { useAppSelector, useKeyPress } from '@hooks';
import { IconClock, IconStar } from '@icons';
import type { IRecipe, IReview } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import Display from './Display';
import Edit from './Edit';
import RecipeTitle from './Title';

export type RecipeProps = Partial<IRecipe> & {
    reviews?: IReview[];
    step?: number;
    withEdit?: boolean;
    hideMobile?: boolean;
};

const Recipe: FC<RecipeProps> = props => {
    const {
        title,
        image,
        prep,
        description,
        user,
        id,
        ingredients,
        withEdit,
        hideMobile,
    } = props;

    const { name, photo } = user || {};

    const methods = useForm<UpdateInput>({
        defaultValues: {
            title,
            prep,
            description,
            ingredients,
        },
    });
    const {
        handleSubmit,
        control,
        formState: { isDirty },
    } = methods;

    const { fields, append, remove } = useFieldArray<UpdateInput>({
        control,
        name: 'ingredients',
    });

    const loggedUser = useAppSelector(state => state.auth.user);

    const isTheSameUser = user?.id === loggedUser?.id;

    const isEnterPressed = useKeyPress('Enter');

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries('GetRecipeById');
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
        [id]
    );

    const numPrep = prep ? parseInt(prep, 10) : undefined;
    const loggedIn = hasCookie('logged_in');

    useEffect(() => {
        if (loggedIn) queryClient.refetchQueries('GetMe');
    }, []);

    useEffect(() => {
        if (isEnterPressed && isDirty) {
            handleSubmit(onSubmit)();
        }
    }, [isEnterPressed, fields, isDirty]);

    if (!user) return null;

    return (
        <RecipeContext.Provider
            value={{
                ...props,
                isEnterPressed,
                isTheSameUser,
                withEdit,
                onSubmit,
                fields,
                append,
                remove,
            }}
        >
            <FormProvider {...methods}>
                <form
                    className={classNames(
                        'grid h-fit max-w-sm origin-top grid-cols-3 gap-y-8 rounded-xl p-8 shadow-card transition-transform duration-500'
                    )}
                >
                    {title && (
                        <RecipeTitle
                            className="col-span-3 h-fit"
                            imgSrc={image}
                            edit={isEnterPressed}
                            title={title}
                        />
                    )}
                    {numPrep && prep && (
                        <Animated className="col-span-3 flex items-center gap-4 transition">
                            <div className="flex items-center">
                                <Edit
                                    className="gap-1"
                                    name={['prep']}
                                    variant="number"
                                    value={prep}
                                >
                                    <IconClock />
                                    <span className="min-w-[4rem] text-xs ">
                                        {numPrep} min
                                    </span>
                                </Edit>
                            </div>
                            <div className="flex items-center justify-center rounded-3xl bg-yellow-100 py-1 px-2 text-xs leading-normal">
                                <IconStar />
                                <span className="pl-1">4.5</span>
                            </div>
                        </Animated>
                    )}
                    {description && (
                        <Animated className="col-span-3">
                            <Edit
                                name={['description']}
                                variant="textarea"
                                value={description}
                            >
                                <p className="max-w-[40ch] break-words text-sm ">
                                    {description}
                                </p>
                            </Edit>
                        </Animated>
                    )}
                    {user && (
                        <Animated className="col-span-3 h-fit">
                            <UserInfo
                                size="sm"
                                title={name}
                                imgSrc={photo}
                                withFollow
                                withLocation
                                disabled={isTheSameUser}
                            />
                        </Animated>
                    )}
                    <Display fields={fields} />
                </form>
            </FormProvider>
        </RecipeContext.Provider>
    );
};

export default Recipe;
