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
        <div className={cn('h-fill flex', size === 'sm' ? 'gap-2' : 'gap-5')}>
            <Image
                width={size === 'sm' ? 35 : 40}
                height={size === 'sm' ? 35 : 40}
                src={imgSrc}
                alt="recipe image"
                className={cn(
                    'w-auto rounded-full',
                    size === 'sm' ? 'max-h-image-sm' : 'max-h-image'
                )}
            />
            <div className="flex flex-col items-start justify-center gap-0.5">
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
