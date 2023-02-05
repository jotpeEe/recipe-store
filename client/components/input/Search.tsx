import { FC, useCallback, useMemo } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import AnimateOnLoad from '@components/animations/AnimateOnLoad';
import RecipeMini from '@components/card/RecipeMini';
import { useGetAllRecipesQuery } from '@generated/graphql';
import { useRecipesFilter } from '@hooks';
import { IconFilter } from '@icons';
import { requestClient } from '@requests';
import useDebounce from 'client/hooks/useDebounce';

import Button from '../Button';
import { Slider } from '../slider';
import FormInput from './Form';

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
    const input = useDebounce(searchInput);

    const search = useMemo(() => {
        const inputLower = input.trim().toLowerCase();

        if (inputLower.length === 0) return [];
        if (all) return useRecipesFilter(allRecipes, inputLower);
        return useRecipesFilter(recipes, inputLower);
    }, [input]);

    const exists = search && search.length !== 0;

    return (
        <div className="grid grid-col-2 gap-6 grid-rows-4">
            <div className="flex gap-4 h-full items-center max-w-[335px]">
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
                <div className="flex row-span-3 ">
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
