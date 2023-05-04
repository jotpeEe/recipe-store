import React, { type FC } from 'react';

import { AnimateOnLoad } from '@components';
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
                        <div className="rounded-xl border-gray-200 shadow-card">
                            {label && (
                                <h6 className="rounded-xl px-3 py-4 text-xs ">
                                    {label}
                                </h6>
                            )}
                            <div className="h-[1px] w-full bg-gray-100"></div>
                            <p
                                className="break-words max-w-[36ch] px-3 py-4 text-xs text-gray-700 opacity-70"
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
