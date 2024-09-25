import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        navState: 'hidden',
    },
    reducers: {
        setNavState: (state, action) => ({
            ...state,
            navState: action.payload,
        }),
    },
});

export const { setNavState } = statusSlice.actions;

export default statusSlice.reducer;
