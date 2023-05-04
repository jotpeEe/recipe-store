import {
    type FC,
    type PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from 'react';

import cn from 'classnames';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Dropdown, Input, TextArea } from '@components';
import { useRecipeContext } from '@contexts';
import { type UpdateInput } from '@generated/graphql';
import { IconDelete, IconEdit } from '@icons';

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

    if (!onSubmit) return null;

    useEffect(() => {
        if (open) setOpen(isEnterPressed || false);
    }, [isEnterPressed]);

    const handleClick = () => {
        if (!withButtons) setOpen(true);
    };

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
                        preventDef
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
                                    preventDef
                                    noValidation
                                />
                                <Input
                                    className="col-span-2"
                                    defaultValue={`${fields?.[ingId].amount}`}
                                    {...register(
                                        `ingredients.${ingId}.amount` as const
                                    )}
                                    ref={null}
                                    preventDef
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
                        preventDef
                    />
                );
        }
    }, [variant]);

    const menu = useMemo(
        () => [
            {
                icon: <IconEdit width={14} height={14} />,
                text: 'Unsave',
            },
            {
                icon: <IconDelete width={16} height={16} />,
                text: 'Delete',
            },
        ],
        []
    );

    const handleMenuSelect = useMemo(
        () => (clicked: number) => {
            const action = {
                0: () => setOpen(true),
                1: () => {
                    remove(ingId);
                    handleSubmit(onSubmit)();
                },
            }[clicked];
            action?.();
        },
        []
    );

    return (
        <div
            className={cn('flex items-center justify-start', className)}
            onClick={e => {
                e.preventDefault();
                handleClick();
            }}
        >
            {open && isTheSameUser ? (
                element
            ) : (
                <>
                    {children}
                    {withButtons && isTheSameUser && withEdit && (
                        <div className="">
                            <Dropdown
                                vertical
                                options={menu}
                                onSelect={handleMenuSelect}
                                className="mr-[-20px]"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Edit;
