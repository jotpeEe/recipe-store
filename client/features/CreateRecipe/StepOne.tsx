import { type FC } from 'react';

import { Button, ImageInput, Input, Select, TextArea } from '@components';
import useCreateRecipeAction from 'client/hooks/createRecipe/useCreateRecipeAction';

import Panel from './Panel';
import StepsHeader from './StepsHeader';

const StepOneForm: FC = () => {
    const { cuisine, cuisines, handleClick } = useCreateRecipeAction('stepOne');

    return (
        <div className="max-w-[300px]">
            <Panel />
            <StepsHeader
                title={'Create Recipe'}
                desc={`Let’s setup default informations about the recipe.`}
            />
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
            {cuisine === 'Other' && (
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
                onClick={handleClick}
                fullWidth
                arrow
            >
                Next
            </Button>
        </div>
    );
};

export default StepOneForm;
