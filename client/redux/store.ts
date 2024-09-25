import { configureStore } from '@reduxjs/toolkit';

import { type IUser } from '@lib/types';

import authReducer from './reducers/authSlice';
import statusReducer from './reducers/statusSlice';

type IStore = {
    auth: {
        user?: IUser;
    };
    status: {
        navState: 'active' | 'hidden';
    };
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = IStore;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
