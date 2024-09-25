import React, { type FC, useCallback, useMemo } from 'react';

import Image from 'next/image';

import Button from '@components/Button';
import { useAddBookmarkMutation } from '@generated/graphql';
import { useAppSelector } from '@hooks';
import Icon from '@icons';
import { type RecipeProps } from '@lib/types';
import { requestClient } from '@requests';

import { Card, Title } from '../CardWithLinks';
import InlineEditableText from '../InlineEditableText';

type RecipeCardProps = {
    recipe: {
        title: RecipeProps['title'];
        id: RecipeProps['id'];
        prep: RecipeProps['prep'];
        ratings: RecipeProps['ratings'];
        user: RecipeProps['user'];
        image: RecipeProps['image'];
    };
    variant: 'recipe' | 'listitem' | 'preview';
    handleRating?: () => void;
};

type RecipeCardItem = {
    variant: RecipeCardProps['variant'];
};

type PrepTimeProps = RecipeCardItem & {
    values: {
        prep: RecipeCardProps['recipe']['prep'];
    };
};

type RatingProps = {
    onClick: RecipeCardProps['handleRating'];
    values: {
        ratings: RecipeCardProps['recipe']['ratings'];
    };
};

type RecipeTitleProps = RecipeCardItem & {
    values: {
        id: RecipeCardProps['recipe']['id'];
        title: RecipeCardProps['recipe']['title'];
        user: RecipeCardProps['recipe']['user'];
    };
};

const countAverageRating = (ratings: RecipeProps['ratings'] | undefined) => {
    if (!ratings || ratings.length === 0) return undefined;
    const totalRating = ratings.reduce((acc, cur) => acc + cur.rating, 0);
    const avgRating = totalRating / ratings.length;
    return avgRating.toFixed(1);
};

const RecipeTitle: FC<RecipeTitleProps> = ({
    variant,
    values: { id, title, user },
}) => {
    if (!title) return null;
    const loggedUser = useAppSelector(state => state.auth.user);
    const isTheSameUser = loggedUser?._id === user?.id;

    return (
        <div className="flex flex-col gap-1 text-white">
            {variant === 'recipe' ? (
                <InlineEditableText name="title">
                    <h6 className="max-w-[19ch] break-words font-bold leading-4 text-white ">
                        {title}
                    </h6>
                </InlineEditableText>
            ) : (
                <Title href={`/recipes/${id}`}>
                    <h6 className="max-w-[19ch] break-words font-bold leading-4 text-white ">
                        {title}
                    </h6>
                </Title>
            )}
            {variant !== 'preview' && (
                <p className="text-[10px] text-white opacity-70">
                    By {isTheSameUser ? 'me' : user?.name}
                </p>
            )}
        </div>
    );
};

const PrepTime: FC<PrepTimeProps> = ({ variant, values: { prep } }) => {
    if (!prep) return null;
    const numPrep = parseInt(prep, 10);

    return (
        <div className="flex w-fit items-center gap-1">
            {variant === 'recipe' ? (
                <InlineEditableText type="inputNumber" name="prep">
                    <div className="flex items-center gap-1">
                        <Icon name="Clock" />
                        <span className="text-xs ">{numPrep} min</span>
                    </div>
                </InlineEditableText>
            ) : (
                <div className="flex w-fit items-center gap-1">
                    <Icon name="Clock" />
                    <span className="max-w-[8ch] overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                        {numPrep} min
                    </span>
                </div>
            )}
        </div>
    );
};

const Rating: FC<RatingProps> = ({ onClick, values: { ratings } }) => {
    const averageRating = useMemo(() => countAverageRating(ratings), [ratings]);

    return (
        <div
            onClick={onClick}
            className="z-20 flex cursor-pointer items-center justify-center rounded-3xl bg-yellow-100 py-1 px-2 text-xs leading-normal"
        >
            <Icon name="Star" width={12} height={12} fill="orange" />
            {averageRating && (
                <span className="pl-1 text-[10px]">{averageRating}</span>
            )}
        </div>
    );
};

const RecipeCard: FC<RecipeCardProps> = ({ handleRating, recipe, variant }) => {
    const { id, image, prep, ratings, title, user } = recipe ?? {};
    const authUser = useAppSelector(state => state.auth.user);

    const { mutate: addBookmark } = useAddBookmarkMutation(requestClient);

    const handleClick = useCallback(() => {
        if (id && user?.id !== authUser?.id) addBookmark({ id });
    }, [authUser, user]);

    return (
        <Card className="col-span-3 flex min-h-[150px] w-full flex-col items-end justify-between rounded-xl from-transparent p-4">
            <Image
                className="absolute left-0 right-0 top-0 bottom-0 h-auto w-full rounded-xl"
                src={image || '/default-recipe.png'}
                placeholder="blur"
                blurDataURL="/recipe-blur.webp"
                alt="My responsive image"
                fill
            />

            {title && <Rating onClick={handleRating} values={{ ratings }} />}

            <div className="z-20 flex w-full items-end justify-between">
                <RecipeTitle variant={variant} values={{ id, user, title }} />
                <div className="flex items-center justify-center gap-2 text-white">
                    <PrepTime variant={variant} values={{ prep }} />
                    {title && variant !== 'listitem' && (
                        <Button
                            className="p-0.5"
                            variant="pure"
                            size="custom"
                            onClick={handleClick}
                            icon={
                                <Icon
                                    name="Bookmark"
                                    className="h-3 w-3 text-black"
                                />
                            }
                        ></Button>
                    )}
                </div>
            </div>
            <div className="absolute left-0 right-0 top-0 bottom-0 z-10 rounded-xl bg-[linear-gradient(transparent_0%,_transparent_40%,_black_100%)]"></div>
        </Card>
    );
};

export default RecipeCard;
