import { FC, useCallback, useMemo, useState } from 'react';

import { RECIPE_LIMIT } from '@constants';
import { IRecipe } from '@lib/types';

import Button from './Button';
import RecipeCard from './card/Recipe';
import Switch from './Switch';

type RecipesListProps = {
    className?: string;
    recipes?: Partial<IRecipe>[];
    panel?: boolean;
};

const RecipesList: FC<RecipesListProps> = ({ className, recipes, panel }) => {
    const [active, setActive] = useState(0);
    const [limit, setLimit] = useState(RECIPE_LIMIT);

    const cuisine = useMemo(
        () =>
            recipes?.reduce(
                (acc, cv) => {
                    if (cv.cuisine) {
                        if (acc.find(element => element === cv.cuisine))
                            return acc;
                        acc.push(cv.cuisine);
                        return acc;
                    }

                    return acc;
                },
                ['All'] as string[]
            ),
        [recipes]
    );

    const recipeList = useMemo(() => {
        if (cuisine && recipes) {
            const filter = cuisine[active];

            if (filter === 'All') return recipes.slice(0, limit);

            const list = recipes
                .filter(recipe => recipe.cuisine === filter)
                .slice(0, limit);

            return list;
        }

        return undefined;
    }, [recipes, limit, active]);

    const handleClick = useCallback(() => {
        setLimit(prevLimit => prevLimit + 4);
    }, []);

    return (
        <div className={`${className} children:mb-4`}>
            <div className="flex gap-3 w-fit">
                <Switch
                    array={cuisine}
                    active={active}
                    setActive={setActive}
                    size="sm"
                />
            </div>
            <div
                className={`grid grid-cols-fill gap-12 overflow-y-auto overflow-x-hidden`}
            >
                {recipeList &&
                    recipeList.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                {panel && (
                    <div className="self-center">
                        <Button href="/create" className="mb-3" size="sm">
                            Create new recipe
                        </Button>
                        <Button
                            onClick={handleClick}
                            className="self-center"
                            outlined
                            size="sm"
                        >
                            View more recipes
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipesList;
