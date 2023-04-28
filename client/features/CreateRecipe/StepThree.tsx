import { type FC, type MouseEventHandler, useCallback, useMemo } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, ErrorMessage, Input, TextArea } from '@components';
import { useCreateRecipe } from '@contexts';

import Panel from './Panel';
import { type RecipeInfoInput } from './RecipeForm';

const StepThreeForm: FC = () => {
    const { isSubmitting } = useCreateRecipe();

    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<RecipeInfoInput>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const ifErrors = useMemo(
        () => Object.entries(errors).length > 0,
        [errors.steps]
    );

    const addField: MouseEventHandler<HTMLButtonElement> = useCallback(e => {
        e.preventDefault();
        append({ text: '' });
    }, []);

    const removeField: MouseEventHandler<HTMLButtonElement> = useCallback(e => {
        e.preventDefault();
        remove(fields.length - 1);
    }, []);

    return (
        <div className="">
            <Panel />
            <h3 className="text-xl">Add steps</h3>
            <p className="pb-4">
                Let’s add some steps <br />
                to the recipe.
            </p>
            <div>
                <div className="flex justify-between pb-4">
                    <Button onClick={addField} size="sm">
                        &#8675; add
                    </Button>
                    <Button onClick={removeField} size="sm" variant="outlined">
                        &#8673; remove
                    </Button>
                </div>
                <ul className="max-h-[500px] w-fit overflow-y-auto">
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
                <ErrorMessage
                    error={
                        ifErrors
                            ? { message: 'No empty step descriptions required' }
                            : undefined
                    }
                />
                <Button
                    isLoading={isSubmitting}
                    className="mt-3"
                    type="submit"
                    fullWidth
                >
                    Create recipe
                </Button>
            </div>
        </div>
    );
};
export default StepThreeForm;
