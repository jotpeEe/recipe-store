import { type FC, useMemo, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { AnimateOnLoad } from '@components/animations';
import Button from '@components/Button';
import RecipeMini from '@components/card/RecipeMini';
import Filter from '@components/Filter';
import Modal from '@components/Modal';
import { type GetProfileDataQueryQuery } from '@generated/graphql';
import { useRecipesFilter } from '@hooks';
import { IconFilter } from '@icons';
import { type FilterOption } from '@lib/types';

import Slider from '../slider';
import FormInput from './Input';

type SearchInputProps = {
    recipes?: GetProfileDataQueryQuery['getAllRecipes']['recipes'];
};

const SearchInput: FC<SearchInputProps> = ({ recipes }) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [filterValues, setFilterValues] = useState<
        FilterOption | undefined
    >();

    const methods = useForm();
    const { watch } = methods;

    const options = useMemo(
        () => [
            {
                name: 'Time',
                options: ['All', 'Newest', 'Oldest', 'Popularity'],
            },
            {
                name: 'Rating',
                options: [1, 2, 3, 4, 5],
                default: 5,
            },
            {
                name: 'Category',
                options: ['All', 'Cereal', 'Vegetables'],
            },
        ],
        []
    );

    const handleSubmit = (activeFilters: FilterOption | undefined) => {
        console.log(activeFilters);
        setOpenFilter(false);
        setFilterValues(activeFilters);
    };

    const searchInput = watch('input') ?? '';

    const search = useMemo(() => {
        const inputLower = searchInput.trim().toLowerCase();

        if (inputLower.length === 0) return [];
        if (!recipes) return [];
        return useRecipesFilter(inputLower, recipes);
    }, [searchInput, recipes]);

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
                <Button
                    onClick={() => setOpenFilter(true)}
                    size="sm"
                    icon={<IconFilter />}
                />
                <Modal openModal={openFilter} setOpenModal={setOpenFilter}>
                    <Filter
                        filterGroups={options}
                        handleSubmit={handleSubmit}
                        updatedState={filterValues}
                    />
                </Modal>
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
