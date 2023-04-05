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
import { type IIngredient, type IReview } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import Display from './Display';
import Edit from './Edit';
import RecipeTitle from './Title';

export type RecipeComponentProps = {
    id?: string;
    title?: string;
    image?: string;
    prep?: string;
    description?: string;
    step?: number;
    user?: {
        id: string;
        name: string;
        photo: string;
    };
    servings?: number | null | undefined;
    steps?: string[];
    ingredients?: IIngredient[];
    reviews?: IReview[];
};

export const Recipe: FC<RecipeComponentProps> = props => {
    const { title, image, prep, description, user } = props;

    const { name, photo } = user || {};
    const numPrep = prep ? parseInt(prep, 10) : undefined;

    const loggedIn = hasCookie('logged_in');

    useEffect(() => {
        if (loggedIn) queryClient.refetchQueries('GetMe');
    }, []);

    return (
        <RecipeContext.Provider value={props}>
            <div
                className={classNames(
                    'grid grid-cols-3 w-fit gap-y-8 p-8 h-fit shadow-card rounded-xl transition-transform duration-500 origin-top'
                )}
            >
                <>
                    {title && (
                        <RecipeTitle
                            className="col-span-3 h-fit"
                            title={title}
                            imgSrc={image}
                        />
                    )}
                    {numPrep && (
                        <Animated className="col-span-3 flex items-center gap-4 transition">
                            <div className="flex gap-1 items-center">
                                <IconClock />
                                <span className="min-w-[4rem] ">
                                    {numPrep} min
                                </span>
                            </div>
                            <div className="flex items-center justify-center rounded-3xl bg-yellow-100 py-1 px-2 text-xs leading-normal">
                                <IconStar />
                                <span className="pl-1">4.5</span>
                            </div>
                        </Animated>
                    )}
                    {description && (
                        <Animated className="col-span-3">
                            <p className="text-base max-w-[40ch] break-words ">
                                {description}
                            </p>
                        </Animated>
                    )}
                    {user && (
                        <Animated className="col-span-3 h-fit">
                            <UserInfo
                                title={name}
                                imgSrc={photo}
                                withFollow
                                withLocation
                            />
                        </Animated>
                    )}
                    <Display />
                </>
            </div>
        </RecipeContext.Provider>
    );
};
