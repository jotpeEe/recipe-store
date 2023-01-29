import { FC, useMemo } from 'react';

import cn from 'classnames';
import format from 'date-fns/format';
import Image from 'next/image';

import { Button, UserInfo } from '@components';
import { IReviewMini } from '@lib/types';

const ReviewMini: FC<IReviewMini> = ({ className, review }) => {
    const { createdAt, text, pos, neg, user } = review;
    const { name, photo } = user;

    const formattedDate = useMemo(() => {
        const date = new Date(createdAt);
        return format(date, 'MMMM dd, yyyy - HH:mm').toString();
    }, [createdAt]);

    return (
        <div className={cn('children:pb-2', className)}>
            <UserInfo
                size="sm"
                imgSrc={photo}
                title={name}
                subtitle={formattedDate}
            />
            <p className="text-xs max-w-[45ch]">{text}</p>
            {(pos.length !== 0 || neg.length !== 0) && (
                <div className="flex gap-2">
                    <Button disabled size="xs">
                        <Image
                            width={8}
                            height={9}
                            src={'/thumbUp.png'}
                            alt="recipe image"
                            className="rounded-full"
                        />
                        <p className="text-xs">{pos.length}</p>
                    </Button>
                    <Button disabled outlined size="xs">
                        <Image
                            width={8}
                            height={9}
                            src={'/thumbDown.png'}
                            alt="recipe image"
                            className="rounded-full"
                        />
                        <p className="text-xs">{neg.length}</p>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ReviewMini;
