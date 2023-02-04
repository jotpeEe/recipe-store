import { FC } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import Animated from '@components/animations/AnimatedDiv';

type RecipeTitleProps = {
    className?: string;
    title?: string;
    imgSrc?: string;
};

const RecipeTitle: FC<RecipeTitleProps> = ({
    title,
    className,
    imgSrc = '/default.png',
}) => (
    <Animated className={classNames('grid grid-cols-3', className)}>
        <div className="relative overflow-hidden w-[100px] h-[100px] rounded-full">
            <Image
                width={110}
                height={110}
                src={imgSrc}
                alt="recipe image"
                className="inline h-full w-auto m-[0 auto]"
            />
        </div>

        <h5 className="col-span-2 self-center text-center justify-self-center md:max-w-[15ch] sm:max-w-[10ch] break-words">
            {title}
        </h5>
    </Animated>
);

export default RecipeTitle;
