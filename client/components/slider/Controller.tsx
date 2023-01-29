import { FC } from 'react';

import classNames from 'classnames';

import { IconArrow } from '@icons';

import Button from '../Button';
// eslint-disable-next-line import/no-cycle
import { useSlider } from './index';

type SliderControllerProps = {
    buttons?: 'inside' | 'outside';
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
                'p-2 rounded-full',
                step === id ? 'bg-black' : 'bg-gray-300'
            )}
            onClick={() => goTo(id)}
        />
    );
};

const SliderController: FC<SliderControllerProps> = ({ steps }) => {
    const { step, next, previous } = useSlider();

    return (
        <div className="flex justify-between items-center py-12 w-fill">
            <ul className="flex gap-2 h-fit">
                {[...Array(steps).keys()].map((i, idx) => (
                    <Dot key={idx} id={idx} />
                ))}
            </ul>
            <div className="flex gap-6">
                <Button
                    circle
                    rotate
                    icon={<IconArrow />}
                    onClick={previous}
                    disabled={step === 0}
                />
                <Button
                    circle
                    icon={<IconArrow />}
                    onClick={next}
                    disabled={step === steps - 1}
                />
            </div>
        </div>
    );
};

export default SliderController;
