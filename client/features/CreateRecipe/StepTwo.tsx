import { type FC } from 'react';

import { Button, ErrorMessage } from '@components';
import useCreateRecipeAction from 'client/hooks/createRecipe/useCreateRecipeAction';

import AddIngredients from './AddIngredients';
import Panel from './Panel';
import StepsHeader from './StepsHeader';

const FormStepTwo: FC = () => {
    const { handleClick } = useCreateRecipeAction('stepTwo');

    return (
        <div>
            <Panel />
            <StepsHeader
                title="Add Ingredients"
                desc={`Let’s add some ingredients to the recipe.`}
            />
            <AddIngredients />
            <ErrorMessage name={'ingredients'} />
            <Button className="mt-3" fullWidth onClick={handleClick} arrow>
                Next
            </Button>
        </div>
    );
};

export default FormStepTwo;
