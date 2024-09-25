import React, { type FC } from 'react';

import { InlineEditableText } from '@components';
import { useRecipeContext } from '@contexts';

const Description: FC<{ className?: string }> = ({ className }) => {
    const { description, withEdit } = useRecipeContext();
    return (
        <>
            {description && (
                <div className={className}>
                    {withEdit ? (
                        <InlineEditableText name="description" type="textarea">
                            <p className="max-w-[36ch] break-words text-sm ">
                                {description}
                            </p>
                        </InlineEditableText>
                    ) : (
                        <p className="max-w-[36ch] break-words text-sm ">
                            {description}
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default Description;
