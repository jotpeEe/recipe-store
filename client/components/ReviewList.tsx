import { type FC, type MouseEventHandler, useCallback, useState } from 'react';

import cn from 'classnames';
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { useCreateReviewMutation } from '@generated/graphql';
import { useAppSelector } from '@hooks';
import { type IReview } from '@lib/types';
import { queryClient, requestClient } from '@requests';

import AnimateOnLoad from './animations/AnimateOnLoad';
import Button from './Button';
import ReviewMini from './card/ReviewMini';
import { TextArea } from './input';

type ReviewListProps = {
    reviews?: IReview[];
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
    const { handleSubmit, reset } = methods;

    const REVIEW_LIMIT = 4;
    const [limit, setLimit] = useState(REVIEW_LIMIT);
    const slicedReviews = reviews?.slice(0, limit);

    const { mutate: createReview } = useCreateReviewMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries('getReviewsByRecipe');
            reset();
            setOpen(state => !state);
        },
    });

    const loggedIn = hasCookie('logged_in');

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        e => {
            e.preventDefault();
            if (reviews) setLimit(clicked ? REVIEW_LIMIT : reviews.length);
            setClicked(state => !state);
        },
        [clicked, reviews]
    );

    const handleCommentClick: MouseEventHandler<HTMLButtonElement> =
        useCallback(
            async e => {
                e.preventDefault();
                if (!loggedIn) router.push('/auth');
                if (!user && loggedIn)
                    await queryClient
                        .refetchQueries('GetMe')
                        .then(() => setOpen(state => !state));
                if (user) setOpen(state => !state);
            },
            [user, loggedIn]
        );

    const onSubmit: SubmitHandler<ReviewInput> = useCallback(values => {
        const { input } = values;
        if (id) createReview({ input, id });
    }, []);

    return (
        <>
            {reviews?.length !== 0 && (
                <div className={cn(fullWidth ? 'w-full' : 'w-fit')}>
                    {reviews && reviews?.length > 4 && (
                        <button
                            onClick={handleClick}
                            className="mb-4 flex w-full items-center gap-3 rounded-3xl bg-primary shadow-card shadow-gray-400"
                        >
                            <div className="my-1 ml-1 rounded-full bg-white px-2 font-medium text-gray-500">
                                {clicked ? '-' : '+'}
                            </div>
                            <h5 className="text-xs text-white">
                                {clicked ? 'Show less' : 'Show more'}
                            </h5>
                        </button>
                    )}
                    <div
                        className={cn(
                            'max-h-[400px]',
                            clicked ? 'overflow-y-auto' : 'overflow-hidden'
                        )}
                    >
                        {slicedReviews?.map((review, index) => (
                            <AnimateOnLoad key={index} index={index}>
                                <ReviewMini review={review} />
                            </AnimateOnLoad>
                        ))}
                    </div>
                </div>
            )}
            {addEnable && !isTheSameUser && (
                <div className="w-full">
                    <button
                        onClick={handleCommentClick}
                        className="mb-4 flex w-full items-center gap-3 rounded-3xl bg-primary shadow-card shadow-gray-400"
                    >
                        <div className="my-1 ml-1 rounded-full bg-white px-2 font-medium text-gray-500">
                            +
                        </div>
                        <h5 className="text-xs text-white">Add comment</h5>
                    </button>
                    {open && (
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextArea
                                    name="input"
                                    placeholder="Enter comment"
                                />
                                <Button type="submit" size="sm">
                                    Add
                                </Button>
                            </form>
                        </FormProvider>
                    )}
                </div>
            )}
        </>
    );
};

export default ReviewList;
