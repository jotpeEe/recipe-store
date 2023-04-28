import {
    type Dispatch,
    type SetStateAction,
    createContext,
    useContext,
} from 'react';

/**
 * This module exports CreateRecipeContext for context provider and useCreateRecipe consumer.
 * @module CreateRecipeContext
 *
 * @param {string | undefined} id recipe id.
 * @param {string[] | undefined} cuisines available cuisines in stored recipes.
 * @param {boolean} isSubmitting form status.
 * @param {() => void} resetForm method to clear recipe edit form.
 *
 * @returns Context
 */
export const CreateRecipeContext = createContext<
    | {
          id: string | undefined;
          cuisines: string[] | undefined;
          isSubmitting: boolean;
          resetForm: () => void;
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
