import { type NextPage } from 'next';

import RecipeLink from '@components/card/RecipeLink';
import RecipeRating from '@components/card/RecipeRating';
import { PageLayout } from '@layouts';

const CreateRecipe: NextPage = () => (
    <PageLayout>
        <RecipeLink />
        <RecipeRating />
    </PageLayout>
);

export default CreateRecipe;
