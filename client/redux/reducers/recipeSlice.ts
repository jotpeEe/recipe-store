import { createSlice } from '@reduxjs/toolkit';

import { type IRecipe } from '@lib/types';

export const initialState: Partial<IRecipe> = {};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setInfo: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        setId: (state, action) => ({
            id: action.payload,
            ...state,
        }),
        addIngredient: (state, action) => {
            if (!state.ingredients)
                return {
                    ...state,
                    ingredients: [action.payload],
                };
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        },
        addStep: (state, action) => {
            if (!state.steps)
                return {
                    ...state,
                    steps: [action.payload],
                };
            return {
                ...state,
                steps: [...state.steps, action.payload],
            };
        },
        setRecipe: (state, action) => ({
            ...action.payload,
        }),
    },
});

export const { setInfo, addIngredient, addStep, setRecipe, setId } =
    recipeSlice.actions;

export default recipeSlice.reducer;
