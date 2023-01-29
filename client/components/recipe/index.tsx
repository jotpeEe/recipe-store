import { FC } from 'react';

import classNames from 'classnames';

import { IconClock, IconStar } from '@icons';
import { IIngredient, IReviewMini, IUser } from '@lib/types';

import Animated from '../AnimatedDiv';
import UserInfo from '../user/Info';
import Display from './Display';
import RecipeTitle from './Title';

export type RecipeComponentProps = {
    title?: string;
    image?: string;
    prep?: string;
    description?: string;
    step?: number;
    user?: Partial<IUser>;
    servings?: number | null | undefined;
    steps?: string[];
    ingredients?: IIngredient[];
    reviews?: IReviewMini['review'][];
};

const Recipe: FC<RecipeComponentProps> = ({
    title,
    image,
    prep,
    description,
    ingredients,
    steps,
    servings,
    step,
    user,
    reviews,
}) => {
    const { name, photo } = user || {};
    const numPrep = prep ? parseInt(prep, 10) : undefined;

    return (
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
                            <span className="min-w-[4rem] ">{numPrep} min</span>
                        </div>
                        <div className="flex items-center justify-center text-xs leading-normal py-1 px-2 rounded-3xl bg-yellow-100">
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
                <Display {...{ ingredients, steps, step, servings, reviews }} />
            </>
        </div>
    );
};

export default Recipe;