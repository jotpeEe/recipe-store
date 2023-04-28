import { type FC } from 'react';

import Image from 'next/image';

import { IconClock } from '@components/icons';
import { type IRecipe } from '@lib/types';

import { Card, Title } from '../CardWithLinks';

const RecipeMini: FC<Partial<IRecipe> | undefined> = props => {
    const { id, title, user, prep, image } = props ?? {};
    const { name, photo } = user ?? {};
    return (
        <div className="pt-12 pl-1">
            <Image
                loading="lazy"
                width={80}
                height={80}
                alt="recipe photo"
                src={image ?? '/default.png'}
                className="absolute z-10 h-20 w-20 -translate-y-8 translate-x-[210%] rounded-full border-none shadow-card shadow-gray-400"
            />
            <Card className="h-24 w-64 rounded-lg border-gray-300 shadow-card shadow-gray-300">
                <div className="flex flex-col gap-6 p-3">
                    <Title
                        href={`/recipes/${id}`}
                        className="max-w-[20ch] overflow-hidden text-ellipsis text-[12px]"
                    >
                        {title}
                    </Title>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                            <Image
                                width={25}
                                height={25}
                                src={photo || ''}
                                alt={`${name} user`}
                                className="rounded-full"
                            ></Image>
                            <p className="w-32 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-gray-400">{`by ${name}`}</p>
                        </div>
                        <div className="flex min-w-fit items-center justify-center gap-1 text-gray-400">
                            <IconClock />
                            <p className="text-[12px] text-gray-400">{`${prep} mins`}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RecipeMini;
