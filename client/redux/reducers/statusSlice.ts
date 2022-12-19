import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        imageUploading: false,
        pageLoading: false,
    },
    reducers: {
        setImageUploading: (state, action) => ({
            ...state,
            imageUploading: action.payload,
        }),
        setPageLoading: (state, action) => ({
            ...state,
            pageLoading: action.payload,
        }),
    },
});

export const { setImageUploading, setPageLoading } = statusSlice.actions;

export default statusSlice.reducer;
