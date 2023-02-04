import { FC, useMemo } from 'react';

import classNames from 'classnames';
import { useForm, FormProvider } from 'react-hook-form';

import AnimateOnLoad from '@components/animations/AnimateOnLoad';
import RecipeMini from '@components/card/RecipeMini';
import { useGetAllRecipesQuery } from '@generated/graphql';
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
        if (all)
            return allRecipes?.filter(
                recipe =>
                    recipe.title.toLowerCase().includes(inputLower) ||
                    recipe.cuisine.toLowerCase().includes(inputLower) ||
                    recipe.title.toLowerCase().includes(inputLower)
            );
        return recipes?.filter(
            recipe =>
                recipe.title.toLowerCase().includes(inputLower) ||
                recipe.cuisine.toLowerCase().includes(inputLower) ||
                recipe.title.toLowerCase().includes(inputLower)
        );
    }, [input]);

    const exists = search && search.length !== 0;

    return (
        <div
            className={classNames(
                'grid grid-col-2 gap-6 ',
                exists ? 'grid-rows-5' : 'grid-rows-4'
            )}
        >
            <div className={`flex gap-4 h-full items-center`}>
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
