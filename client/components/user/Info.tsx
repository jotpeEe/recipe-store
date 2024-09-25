import { type FC } from 'react';

import cn from 'classnames';
import Image from 'next/image';

type UserInfoProps = {
    title?: string;
    subtitle?: string;
    imgSrc?: string;
    size?: 'sm' | 'md';
    className?: string;
};

const UserInfo: FC<UserInfoProps> = ({
    title,
    subtitle,
    imgSrc = '/default.png',
    className,
    size = 'md',
}) => (
    <div className={cn('flex justify-between', className)}>
        <div className={cn('h-fill flex', size === 'sm' ? 'gap-2' : 'gap-5')}>
            <Image
                width={size === 'sm' ? 36 : 42}
                height={size === 'sm' ? 36 : 42}
                src={imgSrc}
                alt="recipe image"
                className={cn(
                    'w-auto rounded-full',
                    size === 'sm' ? 'max-h-image-sm' : 'max-h-image'
                )}
            />
            <div className="flex flex-col items-start justify-center gap-1">
                <h5 className="text-xs">{title}</h5>
                <div className="flex gap-1">
                    <p className="text-xs text-outlined">{subtitle}</p>
                </div>
            </div>
        </div>
    </div>
);

export default UserInfo;
