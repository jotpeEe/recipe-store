import { FC } from 'react';

import Image from 'next/image';

import { Card, Title } from '@components/CardWithLinks';
import { IconClock } from '@components/icons';

type RecipeMiniProps = {
    t__typename?: 'PopulatedData' | undefined;
    title: string;
    prep: string;
    image: string;
    cuisine: string;
    id: string;
    user: {
        name: string;
        photo: string;
    };
};

const RecipeMini: FC<RecipeMiniProps> = ({ id, title, user, prep, image }) => {
    const { name, photo } = user ?? {};
    return (
        <div className="pt-12 ">
            <Image
                width={80}
                height={80}
                alt="recipe photo"
                src={image ?? '/default.png'}
                className="rounded-full absolute -translate-y-8 translate-x-[210%] shadow-card shadow-gray-400"
            ></Image>
            <Card className=" min-w-[250px] border-gray-300 shadow-card shadow-gray-300 rounded-lg">
                <div className="flex flex-col gap-6 p-3">
                    <Title
                        href={`/recipes/${id}`}
                        className="text-[12px] max-w-[20ch] overflow-hidden text-ellipsis"
                    >
                        {title}
                    </Title>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                            <Image
                                width={25}
                                height={25}
                                src={photo}
                                alt={`${name} user`}
                                className="rounded-full"
                            ></Image>
                            <p className="text-[12px] text-gray-400">{`by ${name}`}</p>
                        </div>
                        <div className="flex gap-1 min-w-fit justify-center items-center text-gray-400">
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
