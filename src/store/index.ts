import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '@src/store//slices/uiSlice';
import { userSlice } from '@src/store/slices/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
  },
  // devtools is enabled by default in development mode
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    if (__DEV__) {
      return getDefaultMiddleware();
    }

    return getDefaultMiddleware();
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
