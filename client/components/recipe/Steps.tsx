import React, { type FC } from 'react';

import { AnimateOnLoad } from '@components/animations';
import { useRecipeContext } from '@contexts';

const Steps: FC = () => {
    const { active, steps } = useRecipeContext();
    return (
        <>
            {steps &&
                steps?.length !== 0 &&
                active === 1 &&
                steps.map(({ label, text }, index) => (
                    <AnimateOnLoad key={index} index={index}>
                        <div className="rounded-xl bg-gray-200 p-4">
                            {label && <h6 className="pb-2">{label}</h6>}
                            <p
                                className="max-w-[36ch] break-words text-sm text-gray-700"
                                key={index}
                                lang="pl"
                            >
                                {text}
                            </p>
                        </div>
                    </AnimateOnLoad>
                ))}
        </>
    );
};

export default Steps;
