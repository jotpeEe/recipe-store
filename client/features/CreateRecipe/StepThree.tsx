import { type FC } from 'react';

import { Button, ErrorMessage } from '@components';

import AddSteps from './AddSteps';
import Panel from './Panel';
import StepsHeader from './StepsHeader';

const FormStepThree: FC<{ isLoading: boolean }> = ({ isLoading }) => (
    <div>
        <Panel />
        <StepsHeader
            title="Add steps"
            desc={`Let’s add some steps to the recipe.`}
        />
        <AddSteps />
        <ErrorMessage name={'steps'} />
        <Button isLoading={isLoading} className="mt-3" type="submit" fullWidth>
            Create recipe
        </Button>
    </div>
);
export default FormStepThree;
