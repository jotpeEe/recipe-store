import { type FC, useMemo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { AnimateOnLoad } from '@components/animations';
import Button from '@components/Button';
import RecipeMini from '@components/card/RecipeMini';
import { useGetAllRecipesQuery } from '@generated/graphql';
import { useRecipesFilter } from '@hooks';
import { IconFilter } from '@icons';
import { requestClient } from '@requests';

import Slider from '../slider';
import FormInput from './Input';

type SearchInputProps = {
    all?: boolean;
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

const SearchInput: FC<SearchInputProps> = ({ recipes, all }) => {
    const methods = useForm();
    const { watch } = methods;

    const { data: allRecipes } = useGetAllRecipesQuery(
        requestClient,
        {},
        { select: data => data.getAllRecipes.recipes }
    );

    const searchInput = watch('input') ?? '';
    // const input = useDebounce(searchInput);

    const search = useMemo(() => {
        const inputLower = searchInput.trim().toLowerCase();

        if (inputLower.length === 0) return [];
        if (all) return useRecipesFilter(allRecipes, inputLower);
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
