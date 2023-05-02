import { type FC } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import { AnimatedDiv as Animated } from '@components';
import { useRecipeContext } from '@contexts';

import Edit from './Edit';

type RecipeTitleProps = {
    className?: string;
    size?: 'md' | 'sm';
};

const RecipeTitle: FC<RecipeTitleProps> = ({ size, className }) => {
    const { withEdit, title, image } = useRecipeContext();

    return (
        <Animated className={classNames('grid grid-cols-3', className)}>
            <div
                className={classNames(
                    'relative overflow-hidden rounded-full',
                    size === 'md' && 'h-24 w-24',
                    size === 'sm' && 'h-16 w-16'
                )}
            >
                <Image
                    width={110}
                    height={110}
                    src={
                        image ||
                        'https://res.cloudinary.com/dxkgc7cab/image/upload/v1673326140/m7xf1knsrfbyctetp4ln.png'
                    }
                    alt="recipe image"
                    className="m-[0 auto] inline h-full w-auto"
                />
            </div>

            {title &&
                (withEdit ? (
                    <div className="col-span-2 self-center justify-self-center ">
                        <Edit name={['title']} value={title}>
                            <h5 className="break-words text-center sm:max-w-[10ch] md:max-w-[15ch]">
                                {title}
                            </h5>
                        </Edit>
                    </div>
                ) : (
                    <h5 className="col-span-2 self-center justify-self-center break-words text-center sm:max-w-[10ch] md:max-w-[15ch]">
                        {title}
                    </h5>
                ))}
        </Animated>
    );
};

export default RecipeTitle;
