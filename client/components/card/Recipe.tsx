import Image from 'next/image';

import { IconBookmark, IconStar } from '@icons';
import { IRecipe } from '@lib/types';

import { Card, Title, Link } from '../CardWithLinks';

const RecipeCard: React.FC<{ recipe?: Partial<IRecipe> }> = ({ recipe }) => {
    const { image, title, prep, id } = recipe ?? {};
    return (
        <Card className="flex flex-col justify-center text-center items-center rounded-lg ">
            <div className="absolute bottom-0 left-0 bg-gray-100 w-full h-3/4 rounded-lg"></div>

            <div className="relative overflow-hidden w-[100px] h-[100px] rounded-full">
                <Image
                    width={110}
                    height={110}
                    src={image || '/default.png'}
                    alt="recipe image"
                    className="z-10 inline h-full w-auto m-[0 auto]"
                />

                <div className="absolute flex items-center justify-center text-xs leading-normal py-1 px-2 rounded-3xl bg-yellow-100 -right-6 top-1/2 -translate-y-3/4 ">
                    <IconStar />
                    <span className="pl-1">4.5</span>
                </div>
            </div>

            <h5 className="z-10 font-sans2 py-4 break-words flex justify-center items-center ">
                <Title className="font-sans" href={`/recipes/${id}`}>
                    {title}
                </Title>
            </h5>

            <div className="flex justify-between items-center w-full">
                <div className="z-[5] flex flex-col items-start p-3">
                    <div className="text-xs pb-1">Time</div>
                    <div className="text-xs font-semibold">{prep} mins</div>
                </div>

                <Link
                    href="https://v1.mklos.co"
                    className="z-50 flex justify-center items-center p-1 h-fit rounded-full bg-white mx-3"
                >
                    <IconBookmark />
                </Link>
            </div>
        </Card>
    );
};

export default RecipeCard;
