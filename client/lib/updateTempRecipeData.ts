import {
    type CreateRecipeMutation,
    type GetCreateRecipeDataQuery,
    type UpdateRecipeMutation,
} from '@generated/graphql';
import { queryClient } from '@requests';

const updateTempRecipeData = (
    data:
        | UpdateRecipeMutation['updateRecipe']
        | CreateRecipeMutation['createRecipe']
) => {
    queryClient.setQueryData<GetCreateRecipeDataQuery>(
        ['GetCreateRecipeData', { cat: 'cuisine' }],
        old => {
            if (!old) return old;
            return {
                ...old,
                getTempRecipe: {
                    ...data,
                },
            };
        }
    );
};

export default updateTempRecipeData;
