import { type FC, type MouseEventHandler, useMemo, useState } from 'react';

import cn from 'classnames';
import { useRouter } from 'next/router';

import Button from '@components/Button';
import { useRecipeContext } from '@contexts';
import {
    useCreateRatingMutation,
    useUpdateRatingMutation,
} from '@generated/graphql';
import { useAppSelector } from '@hooks';
import Icon from '@icons';
import { queryClient, requestClient } from '@requests';

type StarsProps = {
    scale: number;
    rating: number;
    hover: number;
    setRating: (rating: number) => void;
    setHover: (hover: number) => void;
};

type RecipeRatingProps = {
    scale?: number;
};

const Stars: FC<StarsProps> = ({
    hover,
    scale,
    rating,
    setRating,
    setHover,
}) => {
    const items = Array.from({ length: scale }, (_, index) => index + 1);

    return (
        <ul className="flex gap-2 text-white">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={cn(
                        hover > index && 'text-amber-500',
                        hover === 0 && rating > index && 'text-amber-500',
                        'relative hover:scale-150'
                    )}
                    onMouseOver={() => setHover(item)}
                    onMouseOut={() => setHover(0)}
                >
                    <label htmlFor={`rating-${item}`}>
                        <Icon
                            name="Star"
                            className="group-hover:scale-150"
                            width={20}
                            height={20}
                            fill="currentColor"
                            stroke="#f59e0b"
                        />
                    </label>
                    <input
                        className="absolute left-0 right-0 bottom-0 top-0 z-20 cursor-pointer opacity-0"
                        type="radio"
                        id={`rating-${item}`}
                        checked={rating === item}
                        onChange={() => setRating(item)}
                    />
                </li>
            ))}
        </ul>
    );
};

const RecipeRating: FC<RecipeRatingProps> = ({ scale = 5 }) => {
    const user = useAppSelector(state => state.auth.user);
    const { id, ratings, setOpenModal } = useRecipeContext();
    const myRating = useMemo(
        () => ratings?.find(item => item.user === user?.id),
        [ratings]
    );

    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(myRating?.rating || 0);

    const router = useRouter();

    const { mutate: createRating } = useCreateRatingMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries(['GetRecipeById', { id }]);
            setOpenModal(false);
        },
        onError() {
            router.push('/auth');
        },
    });

    const { mutate: updateRating } = useUpdateRatingMutation(requestClient, {
        onSuccess() {
            queryClient.refetchQueries(['GetRecipeById', { id }]);
            setOpenModal(false);
        },
        onError() {
            router.push('/auth');
        },
    });

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault();
        if (id && user?.id && !myRating) createRating({ input: rating, id });
        if (id && user?.id && myRating)
            updateRating({ id: myRating.id, input: rating });
        if (!user?.id) router.push('/auth');

        setOpenModal(false);
    };

    return (
        <div className="flex w-fit flex-col items-center gap-4 rounded-2xl border bg-white p-6 drop-shadow">
            <h6 className="">Rate recipe</h6>
            <Stars
                scale={scale}
                rating={rating}
                hover={hover}
                setRating={setRating}
                setHover={setHover}
            />
            <Button onClick={handleSubmit} size="sm" disabled={rating === 0}>
                Submit
            </Button>
        </div>
    );
};

export default RecipeRating;
