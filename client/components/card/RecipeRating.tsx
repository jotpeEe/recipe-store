import { type FC, useMemo, useState } from 'react';

import cn from 'classnames';

import Button from '@components/Button';
import { IconStar } from '@components/icons';

type RecipeRatingProps = {
    scale?: number;
};

const RecipeRating: FC<RecipeRatingProps> = ({ scale = 5 }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);

    const items = useMemo(() => {
        const temp = ['empty'];
        for (let i = 1; i <= scale; i += 1) {
            temp.push(' ');
        }
        return temp;
    }, []);

    return (
        <div className="flex w-fit flex-col items-center rounded-2xl border p-4 drop-shadow children:my-1.5">
            <h6 className="">Rate recipe</h6>
            <ul className="flex text-white children:p-2 ">
                {items.map(
                    (item, index) =>
                        item !== 'empty' && (
                            <li
                                key={index}
                                className={cn(
                                    hover >= index && 'text-amber-500',
                                    hover === 0 &&
                                        rating >= index &&
                                        'text-amber-500',
                                    'relative transition hover:scale-150'
                                )}
                                onMouseOver={() => {
                                    setHover(index);
                                }}
                                onMouseOut={() => {
                                    setHover(0);
                                }}
                            >
                                <label htmlFor="rating" className="">
                                    <IconStar />
                                </label>
                                <input
                                    className="absolute left-0 right-0 bottom-0 top-0 z-20 cursor-pointer opacity-0"
                                    type="radio"
                                    id="rating"
                                    checked={rating === index}
                                    onChange={e => {
                                        e.preventDefault();
                                        setRating(index);
                                    }}
                                />
                            </li>
                        )
                )}
            </ul>
            <Button size="sm" disabled={rating === 0}>
                Submit
            </Button>
        </div>
    );
};

export default RecipeRating;
