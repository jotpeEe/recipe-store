import { FC } from 'react';

import { IRecipe } from '@lib/types';

import Categories from './Categories';
import RecipeCard from './RecipeCard';

type RecipesListProps = {
    className?: string;
    recipes?: Partial<IRecipe>[];
};

const RecipesList: FC<RecipesListProps> = ({ className, recipes }) => (
    <div className={`${className}`}>
        <Categories />
        <div className={`grid grid-cols-4 gap-12`}>
            {recipes &&
                recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
        </div>
    </div>
);

export default RecipesList;
