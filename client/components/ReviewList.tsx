import { type FC, type MouseEventHandler, useCallback, useState } from 'react';

import cn from 'classnames';
import { hasCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
    type GetProfileDataQueryQuery,
    useCreateReviewMutation,
} from '@generated/graphql';
import { useAppSelector } from '@hooks';
import { queryClient, requestClient } from '@requests';

import AddReview from './AddReview';

const ReviewMini = dynamic(() => import('./card/ReviewMini'), {
    loading: () => (
        <div className="flex justify-between">
            <div className="h-fill flex w-full gap-5">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
                <div className="flex flex-col items-start justify-center gap-1">
                    <div className="h-4 w-24 animate-pulse rounded-xl bg-gray-300"></div>
                    <div className="flex gap-1">
                        <div className="h-4 w-16 animate-pulse rounded-xl bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    ),
});

type ReviewListProps = {
    className?: string;
    reviews?: GetProfileDataQueryQuery['getMyReviews']['reviews'];
    id?: string;
    addEnable?: boolean;
    recipeAuthor?: {
        id: string;
        name: string;
        photo: string;
    };
};

type ReviewInput = {
    input: string;
};

const ReviewList: FC<ReviewListProps> = ({
    className,
    reviews,
    id,
    addEnable,
    recipeAuthor,
}) => {
    if (reviews?.length === 0) return null;
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
            <ul
                className={cn(
                    'grid-rows-auto grid w-full grid-cols-1 gap-3 overflow-hidden sm:grid-cols-2  md:grid-cols-1 md:space-y-8',
                    className
                )}
            >
                {reviews?.map((review, index) => (
                    <li key={index}>
                        <ReviewMini review={review} />
                    </li>
                ))}
            </ul>
            {addEnable && !isTheSameUser && (
                <div className="w-full py-2">
                    <AddReview id={id} />
                </div>
            )}
        </>
    );
};

export default ReviewList;
