import { useMemo } from 'react';

import format from 'date-fns/format';

import { IconNext } from '@icons';
import { type IReview } from '@lib/types';

import { Card, Link } from '../CardWithLinks';
import UserInfo from '../user/Info';

const ReviewCard: React.FC<IReview> = ({ text, recipe, user, createdAt }) => {
    const { name, photo } = user ?? {};

    const formattedDate = useMemo(() => {
        const date = new Date(createdAt);
        return format(date, 'MMMM dd, yyyy - HH:mm').toString();
    }, [createdAt]);

    return (
        <Card className="flex pl-1 pt-1">
            <div className="flex h-fit w-60 max-w-md flex-col rounded-xl p-4 text-center shadow-card [&>*]:py-2">
                <UserInfo
                    className="my-4"
                    title={name}
                    imgSrc={photo}
                    size="sm"
                    subtitle={formattedDate}
                />
                <p className="break-words text-left text-xs">{text}</p>
                {/* <Title href={`/recipes/${id}`}>
                    <RecipeTitle size="sm" imgSrc={image} title={title} />
                </Title> */}
                <Link
                    href={`/recipes/${recipe}`}
                    className="w-fill flex items-center justify-end gap-4 text-xs"
                >
                    <IconNext />
                </Link>
            </div>
        </Card>
    );
};

export default ReviewCard;
