import { FC, ReactNode } from 'react';

import Image from 'next/image';
import { useForm, FormProvider } from 'react-hook-form';

import { IconFilter } from '@icons';

import Button from '../Button';
import FormInput from '../FormInput';

type UserInfoProps = {
    children: ReactNode;
    className?: string;
    imgSrc?: string;
    name?: string;
};

const UserInfo: FC<UserInfoProps> = ({
    className,
    children,
    imgSrc = '/default.png',
    name,
}) => {
    const methods = useForm();
    return (
        <div className={`grid grid-col-2 grid-rows-2 gap-6 ${className} `}>
            <div className="col-span-2 flex gap-2">
                <Image
                    className="rounded-full self-center justify-self-center"
                    height={56}
                    width={56}
                    src={imgSrc}
                    alt="userInfo"
                />
                <div className="flex flex-col justify-center gap-1 ">
                    <h3 className="text-xl">{`Hello ${name}`}</h3>
                    <p className="text-xs text-outlined">{children}</p>
                </div>
            </div>
            <div className={`flex gap-4 h-fit items-center ${className}`}>
                <FormProvider {...methods}>
                    <FormInput
                        name="search"
                        placeholder="Search recipe"
                        noValidation
                    />
                </FormProvider>
                <Button size="small" icon={<IconFilter />} />
            </div>
        </div>
    );
};

export default UserInfo;
