import {
    type FC,
    type MouseEvent,
    useCallback,
    useMemo,
    useState,
} from 'react';

import cn from 'classnames';

import { RECIPE_LIMIT } from '@constants';
import { type IRecipe } from '@lib/types';

import AnimateOnLoad from './animations/AnimateOnLoad';
import Button from './Button';
import RecipeCard from './card/Recipe';
import Switch from './Switch';

type RecipesListProps = {
    recipes?: Partial<IRecipe>[];
    panel?: boolean;
};

const RecipesList: FC<RecipesListProps> = ({ recipes, panel }) => {
    const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
    const [limit, setLimit] = useState(RECIPE_LIMIT);

    const cuisines = useMemo(
        () =>
            recipes?.reduce(
                (acc, cv) => {
                    if (cv?.cuisine) {
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
        if (cuisines && recipes) {
            const filter = activeCategoryFilter;

            if (filter === 'All') return recipes.slice(0, limit);

            const list = recipes
                .filter(recipe => recipe?.cuisine === filter)
                .slice(0, limit);

            return list;
        }
        return undefined;
    }, [recipes, limit, activeCategoryFilter]);

    const handleCategoryFilterChange = (filter: string) => {
        setActiveCategoryFilter(filter);
    };

    const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (recipes) setLimit(recipes?.length);
    }, []);

    return (
        <div className={cn('children:mb-4')}>
            <ul className="scrollbar-none flex w-fit gap-3 overflow-x-scroll">
                {cuisines && (
                    <Switch
                        options={cuisines}
                        onOptionChange={handleCategoryFilterChange}
                        activeOption={activeCategoryFilter}
                        size="sm"
                    />
                )}
            </ul>
            <ul
                className={cn(
                    'grid max-h-list grid-cols-fill gap-12',
                    RECIPE_LIMIT === limit
                        ? 'overflow-hidden'
                        : 'overflow-y-auto overflow-x-hidden'
                )}
            >
                {recipeList &&
                    recipeList.map((recipe, index) => (
                        <AnimateOnLoad key={index} index={index} as="li">
                            <RecipeCard recipe={recipe} />
                        </AnimateOnLoad>
                    ))}
                {panel && (
                    <li className="self-center">
                        <Button href="/create" className="mb-3" size="sm">
                            Create new recipe
                        </Button>
                        <Button
                            onClick={handleClick}
                            className="self-center"
                            variant="outlined"
                            size="sm"
                        >
                            View more recipes
                        </Button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default RecipesList;
