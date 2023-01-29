import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: undefined,
    },
    reducers: {
        setUser: (state, action) => ({
            ...state,
            user: {
                ...action.payload,
            },
        }),
        resetUser: () => ({
            user: undefined,
        }),
    },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
