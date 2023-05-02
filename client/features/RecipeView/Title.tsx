import { type FC } from 'react';

import Image from 'next/image';

import { useRecipeContext } from '@contexts';
import { IconBookmark } from '@icons';

import PrepTime from './PrepTime';
import Rating from './Rating';

const Title: FC<{ handleRating: () => void }> = ({ handleRating }) => {
    const { image, title } = useRecipeContext();

    return (
        <div className="relative col-span-3 flex min-h-[150px] w-[315px] flex-col items-end justify-between rounded-xl bg-gradient-to-b from-transparent to-black p-4">
            <Image
                className="absolute left-0 right-0 top-0 bottom-0 z-[-1] rounded-xl"
                src={
                    image ||
                    'https://res.cloudinary.com/dxkgc7cab/image/upload/v1683044395/pgjgl3tkgktenlpw3jzd.png'
                }
                alt="My responsive image"
                fill
            />
            {title && <Rating handleRating={handleRating} />}

            <div className="flex w-full items-end justify-between">
                <div className="flex flex-col gap-1">
                    <h6 className="break-words max-w-[19ch] font-bold leading-4 text-white ">
                        {title}
                    </h6>
                    {/* <p className="text-[10px] text-white opacity-70">
                        By {name}
                    </p> */}
                </div>
                <div className="flex items-center justify-center gap-2 text-white">
                    <PrepTime />
                    {title && (
                        <div className="rounded-xl bg-white p-1">
                            <IconBookmark width={16} height={16} fill="green" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Title;
