import { configureStore } from '@reduxjs/toolkit';

import { IUser } from '@lib/types';

import authReducer from './reducers/authSlice';
import statusSlice from './reducers/statusSlice';

type IStore = {
    auth: {
        user: IUser | null;
    };
    status: {
        imageUploading: boolean;
        pageLoading: boolean;
    };
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = IStore;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
