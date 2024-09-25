import React, {
    type FC,
    type HTMLAttributes,
    type MouseEvent,
    useRef,
    useState,
} from 'react';

import cn from 'classnames';

import {
    AnimateOnLoad,
    Button,
    Dropdown,
    type DropdownProps,
    StepInput,
} from '@components';
import { useRecipeContext } from '@contexts';
import { useOnClickOutside } from '@hooks';
import Icon from '@icons';
import useCrudOperations from 'client/hooks/useCrudOperations';

type StepProps = HTMLAttributes<HTMLDivElement> & {
    index: number;
    values: {
        label?: string | null | undefined;
        text: string;
    };
    zoomed: number;
    dropdownOptions: DropdownProps;
};

const Step: FC<StepProps> = ({
    onClick,
    values: { label, text },
    zoomed,
    index,
    dropdownOptions,
}) => {
    const { withEdit, isTheSameUser } = useRecipeContext();
    const dropdownRef = useRef(null);
    const clickedOutside = useOnClickOutside(dropdownRef);

    const edit = withEdit && isTheSameUser;

    return (
        <div
            className={cn(
                'rounded-xl  bg-white shadow-lg transition',
                zoomed === index
                    ? 'z-[1000] scale-125 cursor-zoom-out'
                    : 'cursor-zoom-in'
            )}
            onClick={clickedOutside || !edit ? onClick : () => {}}
        >
            <div className="relative flex items-center">
                <h6 className="w-full break-words rounded-xl py-4 pl-3 pr-9 text-xs">
                    {label}
                </h6>
                {edit && (
                    <div ref={dropdownRef} className="absolute right-0">
                        <Dropdown {...dropdownOptions} />
                    </div>
                )}
            </div>

            <div className="h-[1px] w-full bg-gray-100"></div>
            <p
                className="max-w-[42ch] break-words px-3 py-4 text-xs text-gray-700 opacity-70"
                lang="pl"
            >
                {text}
            </p>
        </div>
    );
};

const Steps: FC = () => {
    const [zoomed, setZoomed] = useState<number>(-1);
    const { active, withEdit, isTheSameUser, steps } = useRecipeContext();

    const { fields, handleAppendItem, dropdownProps } =
        useCrudOperations('steps');

    const toggleZoom = (e: MouseEvent, index: number) => {
        e.preventDefault();
        if (zoomed === index) {
            setZoomed(-1);
        } else {
            setZoomed(index);
        }
    };

    const edit = withEdit && isTheSameUser;

    const views = withEdit ? fields : steps;

    if (views?.length === 0 || active !== 'Steps') return null;

    return (
        <>
            <ul role="list" className="flex flex-col gap-3">
                {views?.map((step, index) => (
                    <AnimateOnLoad key={index} index={index} as="li">
                        {step.edit ? (
                            <StepInput index={index} defaultValues={step} />
                        ) : (
                            <Step
                                index={index}
                                zoomed={zoomed}
                                values={step}
                                onClick={e => toggleZoom(e, index)}
                                dropdownOptions={{
                                    ...dropdownProps,
                                    idx: index,
                                }}
                            />
                        )}
                    </AnimateOnLoad>
                ))}
                {edit && (
                    <div className="flex items-center justify-center">
                        <Button
                            onClick={handleAppendItem}
                            tooltip="Add ingredient"
                            className="border-slate-600 p-1 text-slate-800 hover:bg-slate-600 hover:text-white"
                            size="custom"
                            variant="custom"
                            icon={<Icon name="Add" className="h-3" />}
                        />
                    </div>
                )}
            </ul>
        </>
    );
};

export default Steps;
