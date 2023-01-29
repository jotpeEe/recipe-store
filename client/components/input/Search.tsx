import { FC } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import { IconFilter } from '@icons';

import Button from '../Button';
import FormInput from './Form';

type SearchInputProps = {
    className?: string;
    imgSrc?: string;
    name?: string;
};

const SearchInput: FC<SearchInputProps> = ({ className }) => {
    const methods = useForm();
    return (
        <div className={`grid grid-col-2 grid-rows-2 gap-6 ${className} `}>
            <div className={`flex gap-4 h-fit items-center ${className}`}>
                <FormProvider {...methods}>
                    <FormInput
                        name="search"
                        placeholder="Search recipe"
                        noValidation
                    />
                </FormProvider>
                <Button size="sm" icon={<IconFilter />} />
            </div>
        </div>
    );
};

export default SearchInput;
