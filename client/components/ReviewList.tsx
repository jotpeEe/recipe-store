import { type FC, type MouseEventHandler, useCallback, useState } from 'react';

import cn from 'classnames';
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateReviewMutation } from '@generated/graphql';
import { useAppSelector } from '@hooks';
import { type IReview } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import AnimateOnLoad from './animations/AnimateOnLoad';
import Button from './Button';
import ReviewMini from './card/ReviewMini';
import { TextArea } from './input';

type ReviewListProps = {
    reviews?: Partial<IReview>[];
    id?: string;
    addEnable?: boolean;
    recipeAuthor?: {
        id: string;
        name: string;
        photo: string;
    };
    fullWidth?: boolean;
};

type ReviewInput = {
    input: string;
};

const ReviewList: FC<ReviewListProps> = ({
    reviews,
    id,
    addEnable,
    recipeAuthor,
    fullWidth,
}) => {
    const [clicked, setClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const { user } = useAppSelector(state => state.auth);
    const router = useRouter();

    const isTheSameUser = recipeAuthor?.id === user?.id;

    const methods = useForm<ReviewInput>();
    const { reset, getValues } = methods;

    const { mutate: createReview } = useCreateReviewMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries({ queryKey: ['GetRecipeById', {}] });
            reset();
            setOpen(state => !state);
        },
    });

    const loggedIn = hasCookie('logged_in');

    const onAddCommentClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async e => {
            e.preventDefault();
            if (!loggedIn) router.push('/auth');
            if (!user && loggedIn)
                await queryClient
                    .refetchQueries({ queryKey: ['GetMe'] })
                    .then(() => setOpen(state => !state));
            if (user) setOpen(state => !state);
        },
        [user, loggedIn]
    );

    const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        e => {
            e.preventDefault();
            const { input } = getValues();
            if (id && input.length !== 0)
                createReview({
                    input,
                    id,
                });
        },
        [id]
    );

    return (
        <>
            {reviews?.length !== 0 && (
                <div className={cn(fullWidth ? 'w-full' : 'w-fit')}>
                    <ul className={cn('max-h-[400px] overflow-y-auto')}>
                        {reviews?.map((review, index) => (
                            <AnimateOnLoad key={index} index={index} as="li">
                                <ReviewMini review={review} />
                            </AnimateOnLoad>
                        ))}
                    </ul>
                </div>
            )}
            {addEnable && !isTheSameUser && (
                <div className="w-full">
                    <button
                        onClick={onAddCommentClick}
                        className="mb-4 flex w-full items-center gap-3 rounded-3xl bg-primary shadow-card shadow-gray-400"
                    >
                        <div className="my-1 ml-1 rounded-full bg-white px-2 font-medium text-gray-500">
                            +
                        </div>
                        <h5 className="text-xs text-white">Add comment</h5>
                    </button>
                    {open && (
                        <FormProvider {...methods}>
                            <TextArea
                                name="input"
                                placeholder="Enter comment"
                            />
                            <Button onClick={handleSubmitClick} size="sm">
                                Add
                            </Button>
                        </FormProvider>
                    )}
                </div>
            )}
        </>
    );
};

export default ReviewList;
