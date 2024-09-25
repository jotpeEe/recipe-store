import { type FC } from 'react';

import { SectionTitle } from '@components';
import RecipeList from '@components/RecipeList';
import { SectionLayout as Layout } from '@layouts';
import { type RecipeProps } from '@lib/types';

type RecipesProps = {
    recipes?: RecipeProps[];
};

const Recipes: FC<RecipesProps> = ({ recipes }) => (
    <Layout id="recipes">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-1to2 ">
            <SectionTitle
                subtitle="Recipes"
                title="The home store for all your recipes"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat."
                href="/create"
                buttonText="Create recipe"
            />
            <RecipeList recipes={recipes} />
        </div>
    </Layout>
);

export default Recipes;
