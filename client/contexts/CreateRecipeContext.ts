import {
    type Dispatch,
    type SetStateAction,
    createContext,
    useContext,
} from 'react';

import { type RecipeInfoInput } from '@hooks';

/**
 * This module exports CreateRecipeContext for context provider and useCreateRecipe consumer.
 * @module CreateRecipeContext
 *
 * @param {string | undefined} id recipe id.
 * @param {string[] | undefined} cuisines available cuisines in stored recipes.
 *
 * @returns Context
 */
export const CreateRecipeContext = createContext<
    | {
          id: string | undefined;
          recipe: RecipeInfoInput | undefined;
          cuisines: string[] | undefined;
          step: number;
          setStep: Dispatch<SetStateAction<number>>;
      }
    | undefined
>(undefined);

/**
 * CreateRecipeContext consumer
 * @returns context of {@link CreateRecipeContext}
 */
export const useCreateRecipe = () => {
    const context = useContext(CreateRecipeContext);

    if (!context) {
        throw new Error('useRecipe must be used within a CreateReact feature.');
    }
    return context;
};
