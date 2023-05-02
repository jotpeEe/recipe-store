import React, { type FC } from 'react';

import { AnimatedDiv as Animated } from '@components';
import { useRecipeContext } from '@contexts';

import Edit from './Edit';

const Description: FC<{ className?: string }> = ({ className }) => {
    const { description, withEdit } = useRecipeContext();
    return (
        <>
            {description && (
                <Animated className={className}>
                    {withEdit ? (
                        <Edit
                            name={['description']}
                            variant="textarea"
                            value={description}
                        >
                            <p className="max-w-[36ch] break-words text-sm ">
                                {description}
                            </p>
                        </Edit>
                    ) : (
                        <p className="max-w-[36ch] break-words text-sm ">
                            {description}
                        </p>
                    )}
                </Animated>
            )}
        </>
    );
};

export default Description;
