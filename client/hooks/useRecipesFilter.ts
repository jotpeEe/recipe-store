type Recipe =
    | {
          __typename?: 'PopulatedData' | undefined;
          title: string;
          prep: string;
          image: string;
          cuisine: string;
          id: string;
          user: {
              name: string;
              photo: string;
          };
      }[]
    | undefined;

const useRecipesFilter = (recipes: Recipe, input: string) =>
    recipes
        ?.filter(
            recipe =>
                recipe.title.toLowerCase().includes(input) ||
                recipe.cuisine.toLowerCase().includes(input) ||
                recipe.title.toLowerCase().includes(input)
        )
        .slice(0, 12);

export default useRecipesFilter;
