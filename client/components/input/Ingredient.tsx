import { type FC } from 'react';

import { type FieldArrayWithId, useFormContext } from 'react-hook-form';

import { type UpdateInput } from '@generated/graphql';

import Input from './Input';

type IngredientInputProps = {
    item: FieldArrayWithId<UpdateInput, 'ingredients', 'id'>;
    index: number;
};

const IngredientInput: FC<IngredientInputProps> = ({ item, index }) => {
    const { register } = useFormContext();

    return (
        <li>
            <div className="grid grid-cols-6">
                <Input
                    className="col-span-4"
                    defaultValue={`${item.name}`}
                    {...register(`ingredients.${index}.name` as const)}
                    ref={null}
                    noValidation
                />
                <Input
                    className="col-span-2"
                    defaultValue={`${item.amount}`}
                    {...register(`ingredients.${index}.amount` as const)}
                    ref={null}
                    noValidation
                />
            </div>
        </li>
    );
};

export default IngredientInput;
