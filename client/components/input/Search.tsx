import { type FC, useMemo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { AnimateOnLoad } from '@components/animations';
import Button from '@components/Button';
import RecipeMini from '@components/card/RecipeMini';
import { useRecipesFilter } from '@hooks';
import { IconFilter } from '@icons';

import Slider from '../slider';
import FormInput from './Input';

type SearchInputProps = {
    recipes:
        | {
              __typename?: 'PopulatedData' | undefined;
              title: string;
              prep: string;
              image: string;
              cuisine: string;
              id: string;
              user: {
                  name: string;
                  photo: string;
              };
          }[]
        | undefined;
};

const SearchInput: FC<SearchInputProps> = ({ recipes }) => {
    const methods = useForm();
    const { watch } = methods;

    const searchInput = watch('input') ?? '';

    const search = useMemo(() => {
        const inputLower = searchInput.trim().toLowerCase();

        if (inputLower.length === 0) return [];
        return useRecipesFilter(recipes, inputLower);
    }, [searchInput]);

    const exists = search && search.length !== 0;

    return (
        <div className="grid-col-2 grid grid-rows-4 gap-6">
            <div className="flex h-full max-w-[335px] items-center gap-4">
                <FormProvider {...methods}>
                    <FormInput
                        name="input"
                        placeholder="Search recipe"
                        noValidation
                    />
                </FormProvider>
                <Button size="sm" icon={<IconFilter />} />
            </div>

            {exists && (
                <div className="row-span-3 flex ">
                    <Slider controller inside>
                        {search?.map((recipe, index) => (
                            <AnimateOnLoad key={index} index={index}>
                                <RecipeMini {...recipe} />
                            </AnimateOnLoad>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
