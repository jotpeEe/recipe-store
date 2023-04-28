import {
    type GetTempRecipeQuery,
    type UpdateRecipeMutation,
} from '@generated/graphql';
import { queryClient } from '@requests';

const updateTempRecipeData = (data: UpdateRecipeMutation) => {
    queryClient.setQueryData<GetTempRecipeQuery>(
        ['GetTempRecipe', {}],
        old => ({
            ...old,
            temp: {
                status: `${old?.temp?.status}`,
                recipe: data.updateRecipe.recipe,
            },
        })
    );
};

export default updateTempRecipeData;
