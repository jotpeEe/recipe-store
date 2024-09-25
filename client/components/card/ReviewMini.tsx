import {
    type DetailedHTMLProps,
    type FC,
    type HTMLAttributes,
    useMemo,
} from 'react';

import cn from 'classnames';
import { format } from 'date-fns';
import Image from 'next/image';

import Button from '@components/Button';
import UserInfo from '@components/user/Info';
import { type IReview } from '@lib/types';

type ReviewMiniProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    review: Partial<IReview>;
};

const ReviewMini: FC<ReviewMiniProps> = ({ className, review, ...props }) => {
    const { createdAt, text, pos, neg, user } = review;
    const { name, photo } = user ?? {};

    const formattedDate = useMemo(() => {
        const date = new Date(createdAt);
        return format(date, 'MMMM dd, yyyy - HH:mm').toString();
    }, [createdAt]);

    return (
        <div
            {...props}
            className={cn('grid overflow-hidden   bg-white', className)}
        >
            <div className={'h-fill flex flex-col gap-2'}>
                <UserInfo
                    size="sm"
                    imgSrc={photo}
                    title={name}
                    subtitle={formattedDate}
                />
                <p className="break-words text-xs">{text}</p>
            </div>
            {(pos?.length !== 0 || neg?.length !== 0) && (
                <div className="flex gap-2">
                    <Button disabled size="xs">
                        <Image
                            width={8}
                            height={9}
                            src={'/thumbUp.png'}
                            alt="recipe image"
                            className="rounded-full"
                        />
                        <p className="text-xs">{pos?.length}</p>
                    </Button>
                    <Button disabled outlined size="xs">
                        <Image
                            width={8}
                            height={9}
                            src={'/thumbDown.png'}
                            alt="recipe image"
                            className="rounded-full"
                        />
                        <p className="text-xs">{neg?.length}</p>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ReviewMini;
