import React, { useCallback } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input, TextArea } from '@components';
import { type RecipeInfoInput } from '@hooks';

import AddAndRemoveBar from './AddAndRemoveBar';

const AddSteps = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<RecipeInfoInput>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const handleAddStep = useCallback(() => append({ text: '' }), []);

    const handleRemoveLastStep = useCallback(
        () => remove(fields.length - 1),
        []
    );

    return (
        <>
            <AddAndRemoveBar
                handleAdd={handleAddStep}
                handleRemove={handleRemoveLastStep}
            />
            <ul className="max-h-[500px] w-full overflow-y-auto">
                {fields.map((item, index) => (
                    <li key={item.id} className="children:mb-3">
                        <Input
                            placeholder={`ex. Step ${
                                index + 1
                            } header (optional)`}
                            {...register(`steps.${index}.label`)}
                            noValidation
                            ref={null}
                        />
                        <TextArea
                            placeholder={`Step ${index + 1} description`}
                            defaultValue={`${item.text}`}
                            error={!!errors?.steps?.[index]?.text}
                            {...register(`steps.${index}.text`)}
                            noValidation
                            ref={null}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default AddSteps;
