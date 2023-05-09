import React, { type FC, type MouseEvent, useState } from 'react';

import cn from 'classnames';

import { AnimateOnLoad } from '@components';
import { useRecipeContext } from '@contexts';

const Steps: FC = () => {
    const [zoomed, setZoomed] = useState<number | undefined>();
    const { active, steps } = useRecipeContext();

    const toggleZoom = (e: MouseEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (zoomed === index) {
            setZoomed(undefined);
        } else {
            setZoomed(index);
        }
    };

    return (
        <>
            {steps && steps?.length !== 0 && active === 'Steps' && (
                <ul role="list" className="flex flex-col gap-3">
                    {steps.map(({ label, text }, index) => (
                        <AnimateOnLoad key={index} index={index} as="li">
                            <div
                                className={cn(
                                    'rounded-xl  bg-white shadow-lg transition',
                                    zoomed === index
                                        ? 'z-[1000] scale-125 cursor-zoom-out'
                                        : 'cursor-zoom-in'
                                )}
                                onClick={e => toggleZoom(e, index)}
                            >
                                {label && (
                                    <h6 className="break-words rounded-xl px-3 py-4 text-xs ">
                                        {label}
                                    </h6>
                                )}
                                <div className="h-[1px] w-full bg-gray-100"></div>
                                <p
                                    className="max-w-[42ch] break-words px-3 py-4 text-xs text-gray-700 opacity-70"
                                    lang="pl"
                                >
                                    {text}
                                </p>
                            </div>
                        </AnimateOnLoad>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Steps;
