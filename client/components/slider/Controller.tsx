import { type FC, useEffect, useState } from 'react';

import cn from 'classnames';

import { useSliderContext } from '@contexts';
import Icon from '@icons';

import Button from '../Button';

type SliderControllerProps = {
    steps: number;
};

type DotProps = {
    id: number;
    clicked: boolean;
    onClick: (id: number) => void;
};

const Dot: FC<DotProps> = ({ id, onClick, clicked }) => {
    const { step } = useSliderContext();

    return (
        <button
            className={cn(
                'rounded-full border border-gray-300 border-opacity-0 p-1 hover:bg-gray-100',
                clicked && 'border-opacity-100'
            )}
            onClick={() => onClick(id)}
            type="button"
        >
            <div
                className={cn(
                    'rounded-full p-1',
                    step === id ? 'bg-gray-700' : 'bg-gray-300'
                )}
            ></div>
        </button>
    );
};

const SliderController: FC<SliderControllerProps> = ({ steps }) => {
    const [clicked, setClicked] = useState<number | undefined>();
    const { step, goTo, next, previous } = useSliderContext();
    const isFirst = step === 0;
    const isLast = step === steps - 1;

    const handleDotClick = (id: number) => {
        goTo(id);
        setClicked(id);
    };

    useEffect(() => {
        if (step !== clicked) setClicked(undefined);
    }, [step]);

    if (steps <= 1) return null;

    return (
        <div className="w-fill flex items-center justify-between">
            <div className="flex gap-6">
                <Button
                    className="border-gray-300 bg-white"
                    circle
                    variant="outlined"
                    rotate
                    icon={<Icon name="Arrow" width={20} height={20} />}
                    size="xxs"
                    onClick={() => {
                        previous();
                        setClicked(undefined);
                    }}
                    disabled={isFirst}
                    hidden={isFirst}
                />
                <Button
                    className="border-gray-300 bg-white"
                    circle
                    variant="outlined"
                    size="xxs"
                    icon={<Icon name="Arrow" width={20} height={20} />}
                    onClick={() => {
                        next();
                        setClicked(undefined);
                    }}
                    disabled={isLast}
                    hidden={isLast}
                />
            </div>
            <ul className="flex h-fit gap-0.5">
                {[...Array(steps).keys()].map((i, idx) => (
                    <Dot
                        key={idx}
                        id={idx}
                        onClick={handleDotClick}
                        clicked={clicked === idx && step === clicked}
                    />
                ))}
            </ul>
        </div>
    );
};

export default SliderController;
