import {
    type Dispatch,
    type MutableRefObject,
    type SetStateAction,
    createContext,
    useContext,
} from 'react';

import type { SubmitHandler } from 'react-hook-form';

import { type UpdateInput } from '@generated/graphql';
import { type RecipeProps } from '@lib/types';

export const RecipeContext = createContext<
    | (RecipeProps & {
          isEnterPressed: boolean;
          isTheSameUser: boolean;
          active: number;
          recipeRef: MutableRefObject<null | HTMLElement>;
          openModal: boolean;
          setOpenModal: Dispatch<SetStateAction<boolean>>;
          onSubmit: SubmitHandler<UpdateInput>;
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
