import { type FC } from 'react';

import classNames from 'classnames';

import { useSliderContext } from '@contexts';
import { IconArrow } from '@icons';

import Button from '../Button';

type SliderControllerProps = {
    inside?: boolean;
    steps: number;
};

type DotProps = {
    id: number;
    active?: boolean;
};

const Dot: FC<DotProps> = ({ id }) => {
    const { step, goTo } = useSlider();

    return (
        <button
            className={classNames(
                'rounded-full p-1.5',
                step === id ? 'bg-black' : 'bg-gray-300'
            )}
            onClick={() => goTo(id)}
        />
    );
};

const SliderController: FC<SliderControllerProps> = ({ steps, inside }) => {
    const { step, next, previous } = useSlider();
    const isFirst = step === 0;
    const isLast = step === steps - 1;

    return (
        <div
            className={classNames(
                inside
                    ? 'absolute w-full -translate-y-[310%]'
                    : 'w-fill flex items-center justify-between py-12'
            )}
        >
            {!inside && (
                <ul className="flex h-fit gap-2">
                    {[...Array(steps).keys()].map((i, idx) => (
                        <Dot key={idx} id={idx} />
                    ))}
                </ul>
            )}
            <div
                className={classNames(
                    inside ? 'flex justify-between' : 'flex gap-6'
                )}
            >
                <Button
                    className="border-none bg-transparent"
                    circle
                    rotate
                    icon={<IconArrow />}
                    onClick={previous}
                    disabled={isFirst}
                    hidden={isFirst}
                />
                <Button
                    className="border-none bg-transparent"
                    circle
                    icon={<IconArrow />}
                    onClick={next}
                    disabled={isLast}
                    hidden={isLast}
                />
            </div>
        </div>
    );
};

export default SliderController;
