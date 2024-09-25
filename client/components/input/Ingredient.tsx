import { type FC } from 'react';

import { useFormContext } from 'react-hook-form';

import Button from '@components/Button';
import { type UpdateInput } from '@generated/graphql';
import Icon from '@icons';
import { cn } from '@lib/utils';

import Input from './Input';

type IngredientInputProps = {
    index: number;
    handleRemove: () => void;
    defaultValues?: {
        name?: string;
        amount?: string;
    };
    edit?: boolean;
};

const IngredientInput: FC<IngredientInputProps> = ({
    index,
    handleRemove,
    edit,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<UpdateInput>();

    return (
        <>
            <div className={cn(edit ? 'flex w-full' : 'grid grid-cols-8')}>
                <Input
                    className={cn(!edit && 'col-span-5')}
                    {...register(`ingredients.${index}.name`)}
                    error={errors.ingredients?.[index]?.name !== undefined}
                    small
                    noValidation
                    ref={null}
                />
                <Input
                    className={cn(edit ? 'basis-1/2' : 'col-span-2')}
                    {...register(`ingredients.${index}.amount`)}
                    error={errors.ingredients?.[index]?.amount !== undefined}
                    noValidation
                    small
                    ref={null}
                />
                <div className="col-span-1 mr-[-20px]">
                    <Button
                        icon={<Icon name="Delete" className="h-4" />}
                        variant="pure"
                        shape="square"
                        onClick={handleRemove}
                    />
                </div>
            </div>
        </>
    );
};

export default IngredientInput;
