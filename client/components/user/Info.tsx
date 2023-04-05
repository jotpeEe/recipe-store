import { type FC } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { IconPin } from '@icons';

import Button from '../Button';

type UserInfoProps = {
    title?: string;
    subtitle?: string;
    imgSrc?: string;
    size?: 'sm' | 'md';
    className?: string;
    withFollow?: boolean;
    withLocation?: boolean;
};

const UserInfo: FC<UserInfoProps> = ({
    title,
    subtitle,
    imgSrc = '/default.png',
    className,
    size = 'md',
    withFollow,
    withLocation,
}) => (
    <div
        className={cn(
            'flex justify-between',
            withFollow && 'justify-between',
            className
        )}
    >
        <div className={cn('flex h-fill', size === 'sm' ? 'gap-2' : 'gap-5')}>
            <Image
                width={size === 'sm' ? 35 : 56}
                height={size === 'sm' ? 35 : 56}
                src={imgSrc}
                alt="recipe image"
                className="rounded-full"
            />
            <div className="flex flex-col justify-center items-start gap-0.5">
                <h5 className={cn(size === 'sm' && 'text-xs')}>{title}</h5>
                <div className="flex gap-1">
                    {withLocation && <IconPin />}
                    <p
                        className={cn(
                            'text-outlined',
                            size === 'sm' ? 'text-[10px] ' : ''
                        )}
                    >
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
        {withFollow && (
            <Button size="sm" className="self-center ml-5 justify-self-end">
                Follow
            </Button>
        )}
    </div>
);

export default UserInfo;
