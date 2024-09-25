import { type FC, useMemo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Input from './input/Input';

const SearchInput: FC = () => {
    const methods = useForm();

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
            {
                name: 'Stars',
                options: [1, 2, 3, 4, 5],
            },
        ],
        []
    );

    // const handleSubmit = (activeFilters: FilterOption | undefined) => {
    //     setOpenFilter(false);
    //     setFilterValues(activeFilters);
    // };

    // const searchInput = watch('input') ?? '';

    // const search = useMemo(() => {
    //     const inputLower = searchInput.trim().toLowerCase();

    //     if (inputLower.length === 0) return [];
    //     if (!recipes) return [];
    //     return useRecipesFilter(inputLower, recipes);
    // }, [searchInput, recipes]);

    return (
        <div className="">
            <div className="flex items-center gap-4">
                <form>
                    <FormProvider {...methods}>
                        <Input
                            icon={{ name: 'Search', position: 'start' }}
                            name="input"
                            fit
                            placeholder="Search recipe"
                            noValidation
                            small
                        />
                    </FormProvider>
                </form>
            </div>
        </div>
    );
};

export default SearchInput;
