import {
    useGetAllRecipesQuery,
    useGetMyRecipesQuery,
} from '@generated/graphql';
import { setPageLoading } from '@redux';
import { requestClient } from '@requests';

import { useAppDispatch } from './redux';

const useRecipeQueries = () => {
    const dispatch = useAppDispatch();

    const getRecipes = useGetMyRecipesQuery(
        requestClient,
        {},
        {
            select: data => data.getRecipes.recipes,
            onError(error: any) {
                dispatch(setPageLoading(false));
            },
        }
    );

    const getAllRecipes = useGetAllRecipesQuery(
        requestClient,
        {},
        {
            select: data => data.getAllRecipes.recipes,
            onError(error: any) {
                dispatch(setPageLoading(false));
            },
        }
    );

    return {
        getRecipes,
        getAllRecipes,
    };
};

export default useRecipeQueries;
