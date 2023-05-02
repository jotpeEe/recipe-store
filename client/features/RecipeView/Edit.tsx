import {
    type FC,
    type MouseEvent,
    type PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import cn from 'classnames';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, Input, TextArea } from '@components';
import { useRecipeContext } from '@contexts';
import { type UpdateInput } from '@generated/graphql';
import { IconClear, IconEdit } from '@icons';

type EditProps = PropsWithChildren & {
    className?: string;
    value?: string;
    name: string[];
    ingId?: number;
    variant?: 'textarea' | 'number' | 'array';
    withButtons?: boolean;
};

const Edit: FC<EditProps> = ({
    children,
    className,
    value,
    variant,
    name,
    ingId,
    withButtons,
}) => {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, control } = useFormContext<UpdateInput>();

    const { fields, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const { withEdit, isEnterPressed, isTheSameUser, onSubmit } =
        useRecipeContext();

    useEffect(() => {
        if (open) setOpen(isEnterPressed);
    }, [isEnterPressed]);

    const handleClick = () => {
        if (!withButtons) setOpen(true);
    };

    const handleEdit = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setOpen(true);
        },
        [open]
    );

    const element = useMemo(() => {
        switch (variant) {
            case 'textarea':
                return (
                    <TextArea
                        name={name[0]}
                        value={value}
                        noValidation
                        autoFocus
                    />
                );
            case 'number':
                return (
                    <Input
                        name={name[0]}
                        value={value}
                        type="number"
                        noValidation
                        autoFocus
                    />
                );
            case 'array':
                return (
                    <div className="relative grid grid-cols-6">
                        {ingId !== undefined && withEdit && (
                            <>
                                <Input
                                    className="col-span-4"
                                    defaultValue={`${fields?.[ingId].name}`}
                                    {...register(
                                        `ingredients.${ingId}.name` as const
                                    )}
                                    ref={null}
                                    noValidation
                                />
                                <Input
                                    className="col-span-2"
                                    defaultValue={`${fields?.[ingId].amount}`}
                                    {...register(
                                        `ingredients.${ingId}.amount` as const
                                    )}
                                    ref={null}
                                    noValidation
                                />
                            </>
                        )}
                    </div>
                );
            default:
                return (
                    <Input
                        name={name[0]}
                        value={value}
                        noValidation
                        autoFocus
                    />
                );
        }
    }, [variant]);

    return (
        <div
            className={cn(
                'relative flex items-center justify-start',
                className
            )}
            onClick={handleClick}
        >
            {open && isTheSameUser ? (
                element
            ) : (
                <>
                    {children}
                    {withButtons && isTheSameUser && withEdit && (
                        <div className="absolute -right-6 top-0 flex flex-col gap-1">
                            <Button
                                variant="outlined"
                                size="xxs"
                                icon={<IconEdit />}
                                onClick={handleEdit}
                            />
                            <Button
                                variant="alert"
                                size="xxs"
                                type="button"
                                icon={<IconClear />}
                                onClick={e => {
                                    e.preventDefault();
                                    remove(ingId);
                                    handleSubmit(onSubmit)();
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Edit;
