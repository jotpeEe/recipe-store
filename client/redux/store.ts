import { configureStore } from '@reduxjs/toolkit';

import { IRecipe, IUser } from '@lib/types';

import authReducer from './reducers/authSlice';
import recipeSlice from './reducers/recipeSlice';
import statusSlice from './reducers/statusSlice';

type IStore = {
    auth: {
        user?: Partial<IUser>;
    };
    status: {
        imageUploading: boolean;
        pageLoading: boolean;
        isSubmitting: boolean;
    };
    recipe: IRecipe | Partial<IRecipe> | undefined;
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusSlice,
        recipe: recipeSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = IStore;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
