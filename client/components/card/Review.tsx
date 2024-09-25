import { useMemo } from 'react';

import format from 'date-fns/format';

import { type IReview } from '@lib/types';

import { Card } from '../CardWithLinks';
import UserInfo from '../user/Info';

const ReviewCard: React.FC<IReview> = ({ text, user, createdAt }) => {
    const { name, photo } = user ?? {};

    const formattedDate = useMemo(() => {
        const date = new Date(createdAt);
        return format(date, 'MMMM dd, yyyy - HH:mm').toString();
    }, [createdAt]);

    return (
        <Card className="w-full pl-1 pt-1">
            <div className="flex h-fit flex-col rounded-xl bg-white p-8 text-center shadow-card">
                <UserInfo
                    className="mb-4"
                    title={name}
                    imgSrc={photo}
                    size="sm"
                    subtitle={formattedDate}
                />
                <p className="break-words text-left text-xs">{text}</p>
            </div>
        </Card>
    );
};

export default ReviewCard;
