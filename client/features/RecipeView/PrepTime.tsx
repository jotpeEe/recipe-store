import React, { type FC } from 'react';

import { useRecipeContext } from '@contexts';
import { IconClock } from '@icons';

import Edit from './Edit';

const PrepTime: FC = () => {
    const { prep, withEdit } = useRecipeContext();
    const numPrep = prep ? parseInt(prep, 10) : undefined;

    return (
        <div className="flex w-fit items-center gap-1">
            {withEdit ? (
                <Edit
                    className="gap-1"
                    name={['prep']}
                    variant="number"
                    value={prep}
                >
                    <div className="flex items-center gap-1">
                        <IconClock />
                        <span className="text-xs ">{numPrep} min</span>
                    </div>
                </Edit>
            ) : (
                <>
                    {numPrep && (
                        <div className="flex w-fit items-center gap-1">
                            <IconClock />
                            <span className="text-xs ">{numPrep} min</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PrepTime;
