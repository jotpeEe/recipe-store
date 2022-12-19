import { FC } from 'react';

import {
    RecipeCard,
    CardList,
    Categories,
    SectionTitle,
    RecipesList,
} from '@components';
import { SectionLayout as Layout } from '@layouts';
import { IRecipe } from '@lib/types';

type RecipesProps = {
    recipes: Partial<IRecipe>[] | undefined;
};

const Recipes: FC<RecipesProps> = ({ recipes }) => (
    <Layout id="recipes">
        <div className="grid grid-cols-1to2 gap-20 ">
            <SectionTitle
                subtitle="Recipes"
                title="The home store for all your recipes"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat."
                button="Create recipe"
            />
            <RecipesList recipes={recipes} />
        </div>
    </Layout>
);

export default Recipes;
