import Image from 'next/image';

import { IconBookmark, IconStar } from '@icons';
import { type IRecipe } from '@lib/types';

import { Card, Link, Title } from '../CardWithLinks';

const RecipeCard: React.FC<{ recipe?: Partial<IRecipe> }> = ({ recipe }) => {
    const { image, title, prep, id } = recipe ?? {};
    return (
        <Card className="flex flex-col items-center justify-center rounded-lg text-center ">
            <div className="absolute bottom-0 left-0 h-3/4 w-full rounded-lg bg-gray-100"></div>

            <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
                <Image
                    width={110}
                    height={110}
                    src={image || '/default.png'}
                    alt="recipe image"
                    className="m-[0 auto] z-10 inline h-full w-auto"
                />

                <div className="absolute -right-6 top-1/2 flex -translate-y-3/4 items-center justify-center rounded-3xl bg-yellow-100 py-1 px-2 text-xs leading-normal ">
                    <IconStar />
                    <span className="pl-1">4.5</span>
                </div>
            </div>

            <h5 className="z-10 flex items-center justify-center break-words py-4 font-sans2 ">
                <Title className="font-sans" href={`/recipes/${id}`}>
                    {title}
                </Title>
            </h5>

            <div className="flex w-full items-center justify-between">
                <div className="z-[5] flex flex-col items-start p-3">
                    <div className="pb-1 text-xs">Time</div>
                    <div className="text-xs font-semibold">{prep} mins</div>
                </div>

                <Link
                    href="https://v1.mklos.co"
                    className="z-50 mx-3 flex h-fit items-center justify-center rounded-full bg-white p-1"
                >
                    <IconBookmark />
                </Link>
            </div>
        </Card>
    );
};

export default RecipeCard;
