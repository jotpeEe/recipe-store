import { useMemo } from 'react';

import { type UseFormWatch } from 'react-hook-form';

import { type GetProfileDataQueryQuery } from '@generated/graphql';
import { useDebouncedValue } from '@hooks';

import { type ListsDisplayFilters, type RecipeListProps } from './ListsDisplay';

const calculateAverageRating = (
    ratings: GetProfileDataQueryQuery['getRecipes']['recipes'][0]['ratings']
) => {
    const totalRatings = ratings.length;
    const totalRatingSum = ratings.reduce(
        (sum, ratingDoc) => sum + ratingDoc.rating,
        0
    );
    const averageRating = totalRatingSum / totalRatings;

    return parseInt(averageRating.toFixed(1), 10);
};

const useFilteredRecipes = (
    watch: UseFormWatch<ListsDisplayFilters>,
    recipes?: RecipeListProps['recipes']
) => {
    const search = watch('search');
    const menuStatus = watch('menuStatus');
    const {
        ingredient,
        cuisine: filterCuisine,
        time,
        rating,
    } = watch('recipes');
    const searchTerm = useDebouncedValue(search, 100);

    const filteredRecipes = useMemo(() => {
        if (menuStatus !== 'recipes') return recipes;

        return recipes?.filter(recipe => {
            const title = recipe.title.toLowerCase();
            const cuisine = recipe.cuisine.toLowerCase();
            const { ingredients, ratings, prep } = recipe;

            if (
                (filterCuisine &&
                    !cuisine
                        .toLowerCase()
                        .includes(filterCuisine.toLowerCase())) ||
                (ingredient &&
                    !ingredients.some(ing =>
                        ing.name
                            .toLowerCase()
                            .includes(ingredient.toLowerCase())
                    )) ||
                (time && !(parseInt(prep, 10) < time)) ||
                (rating && calculateAverageRating(ratings) !== rating)
            )
                return false;

            if (searchTerm) {
                if (
                    title.toLowerCase().includes(searchTerm) ||
                    cuisine.includes(searchTerm) ||
                    ingredients.some(ing =>
                        ing.name.toLowerCase().includes(searchTerm)
                    )
                )
                    return true;

                return false;
            }

            return true;
        });
    }, [
        ingredient,
        filterCuisine,
        time,
        rating,
        searchTerm,
        recipes,
        menuStatus,
    ]);

    return filteredRecipes;
};

export default useFilteredRecipes;
