import { type FC } from 'react';

import cn from 'classnames';

import { useSliderContext } from '@contexts';

type BreadCrumbsProps = {
    steps: string[];
};

const BreadCrumbs: FC<BreadCrumbsProps> = ({ steps }) => {
    const { step } = useSliderContext();

    return (
        <ul className="flex items-center justify-start gap-2 pb-2 ">
            {steps.map((item, index) => (
                <li
                    key={index}
                    className={cn(
                        'flex w-fit  gap-2 children:text-xs',
                        step >= index
                            ? 'children:text-primary'
                            : 'children:text-gray-400'
                    )}
                >
                    {index !== 0 && <p>&#8594;</p>}
                    <p key={index}>{item}</p>
                </li>
            ))}
        </ul>
    );
};

export default BreadCrumbs;
