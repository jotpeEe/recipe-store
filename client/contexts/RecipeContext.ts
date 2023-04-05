import { createContext, useContext } from 'react';

import type {
    FieldArrayWithId,
    SubmitHandler,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
} from 'react-hook-form';

import { type RecipeComponentProps } from '@components/recipe';
import { type UpdateInput } from '@generated/graphql';

export const RecipeContext = createContext<
    | (RecipeComponentProps & {
          isEnterPressed: boolean;
          isTheSameUser: boolean;
          fields: FieldArrayWithId<UpdateInput, 'ingredients', 'id'>[];
          onSubmit: SubmitHandler<UpdateInput>;
          append: UseFieldArrayAppend<UpdateInput, 'ingredients'>;
          remove: UseFieldArrayRemove;
          withEdit: boolean | undefined;
      })
    | undefined
>(undefined);

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);

    if (!context) {
        throw new Error('useRecipe must be used within a Recipe');
    }
    return context;
};
