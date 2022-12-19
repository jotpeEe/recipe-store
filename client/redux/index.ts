export { default as authSlice, setUser } from './reducers/authSlice';
export {
    default as featuresStatusSlice,
    setImageUploading,
    setPageLoading,
} from './reducers/statusSlice';
export { default as store, type RootState, type AppDispatch } from './store';
