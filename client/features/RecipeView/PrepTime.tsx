import React, { type FC } from 'react';

import { useRecipeContext } from '@contexts';
import { IconClock } from '@icons';

import Edit from './Edit';

const PrepTime: FC = () => {
    const { prep } = useRecipeContext();
    const numPrep = prep ? parseInt(prep, 10) : undefined;

    return (
        <div className="flex items-center">
            <Edit
                className="gap-1"
                name={['prep']}
                variant="number"
                value={prep}
            >
                <IconClock />
                <span className="min-w-[4rem] text-xs ">{numPrep} min</span>
            </Edit>
        </div>
    );
};

export default PrepTime;
