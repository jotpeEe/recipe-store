import { type FC, type MouseEventHandler, useCallback } from 'react';

import { useFormContext } from 'react-hook-form';

import { Button, ImageInput, Input, Select, TextArea } from '@components';
import { useCreateRecipe, useSliderContext } from '@contexts';
import {
    type GetTempRecipeQuery,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} from '@generated/graphql';
import updateTempRecipeData from '@lib/updateTempRecipeData';
import { queryClient, requestClient } from '@requests';

import Panel from './Panel';
import { type RecipeInfoInput } from './RecipeForm';

const StepOneForm: FC = () => {
    const { next, step } = useSliderContext();
    const { id } = useCreateRecipe();
    const {
        watch,
        trigger,
        getValues,
        formState: { isDirty },
    } = useFormContext<RecipeInfoInput>();

    const { cuisines } = useCreateRecipe();

    const { mutate: updateRecipe } = useUpdateRecipeMutation(requestClient, {
        onSuccess(data) {
            updateTempRecipeData(data);
            next();
        },
    });
    const { mutate: createRecipe } = useCreateRecipeMutation(requestClient, {
        onSuccess(data) {
            queryClient.setQueryData<GetTempRecipeQuery>(
                ['GetTempRecipe', {}],
                oldData => ({
                    ...oldData,
                    temp: {
                        status: `${oldData?.temp?.status}`,
                        recipe: data.createRecipe.recipe,
                    },
                })
            );
            next();
        },
    });

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
        async e => {
            e.preventDefault();

            const valid = await trigger([
                'title',
                'cuisine',
                'prep',
                'image',
                'description',
                'newCuisine',
            ]);

            const { newCuisine, cuisine, ...rest } = getValues();
            const input = {
                ...rest,
                cuisine: newCuisine || cuisine,
                temp: true,
            };

            if (valid) {
                if (id && isDirty) updateRecipe({ id, input });
                if (!id && isDirty) createRecipe({ input });
                if (!isDirty) next();
            }
        },
        [id, isDirty, step]
    );

    const select = watch('cuisine');

    return (
        <div className="max-w-[300px]">
            <Panel />
            <h3 className="w-full text-xl">Create a recipe</h3>
            <p className="pb-4">
                Let’s setup default informations <br />
                about the recipe.
            </p>
            <Input
                label="Title"
                name="title"
                placeholder="Enter title"
                type="text"
            />
            <Select
                label="Cuisine (ex. Thai, Polish)"
                name="cuisine"
                options={cuisines}
                placeholder="Enter cuisine"
            />
            {select === 'Other' && (
                <Input name="newCuisine" placeholder="Enter cuisine" />
            )}
            <Input
                label="Prep time"
                name="prep"
                placeholder="ex. 35 min"
                type="number"
            />
            <TextArea
                label="Description"
                name="description"
                placeholder="Enter description"
            />
            <ImageInput name="image" instantUpload />
            <Button
                className="my-7"
                type="button"
                onClick={handleSubmit}
                fullWidth
                arrow
            >
                Next
            </Button>
        </div>
    );
};

export default StepOneForm;
