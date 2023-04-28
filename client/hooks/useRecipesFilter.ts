import { type GetProfileDataQueryQuery } from '@generated/graphql';

const useRecipesFilter = (
    input: string,
    recipes?: GetProfileDataQueryQuery['getAllRecipes']['recipes']
) =>
    recipes?.filter(
        recipe =>
            recipe.title.toLowerCase().includes(input) ||
            recipe.cuisine.toLowerCase().includes(input)
    );

export default useRecipesFilter;
