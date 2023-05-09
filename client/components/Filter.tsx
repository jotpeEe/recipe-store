import React, { type FC, useMemo, useState } from 'react';

import { type FilterOption } from '@lib/types';

import Button from './Button';
import Switch from './Switch';

type FilterGroup = {
    name: string;
    options: (string | number)[];
    default?: string | number;
};

type FilterProps = {
    filterGroups: FilterGroup[];
    handleSubmit: (activeFilters?: FilterOption) => void;
    updatedState?: FilterOption | undefined;
};

const Filter: FC<FilterProps> = ({
    filterGroups,
    handleSubmit,
    updatedState,
}) => {
    const initState = useMemo(
        () =>
            Object.fromEntries(
                filterGroups.map(group => [
                    group.name.toLowerCase(),
                    group.default || group?.options[0],
                ])
            ),
        [filterGroups]
    );

    const [activeFilters, setActiveFilters] = useState(
        updatedState || initState
    );

    const handleFilterChange = (
        filter: string | number,
        group?: FilterGroup['name']
    ) => {
        if (group)
            setActiveFilters(prevState => ({ ...prevState, [group]: filter }));
    };

    return (
        <div className="w-fit rounded-2xl border bg-white px-8 py-6 shadow-card children:py-2.5">
            <h5 className="text-center">Filter Search</h5>
            {filterGroups.map(group => {
                const name = group.name.toLowerCase();
                return (
                    <div key={group.name}>
                        <h6 className="pb-2.5">{group.name} </h6>
                        <Switch
                            options={group.options}
                            label={name}
                            onOptionChange={handleFilterChange}
                            activeOption={activeFilters[name]}
                            size="sm"
                            withBorder
                        />
                    </div>
                );
            })}
            <div className="flex items-center justify-center">
                <Button
                    onClick={e => {
                        e.preventDefault();
                        handleSubmit(activeFilters);
                    }}
                    size="sm"
                    type="button"
                    className="align-center mt-4"
                >
                    Filter
                </Button>
            </div>
        </div>
    );
};

export default Filter;
