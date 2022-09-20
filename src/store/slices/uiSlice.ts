import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  login,
  register,
  updateUser,
  uploadImage,
} from '@src/store/slices/userSlice';

export type ToastState = {
  toast: ToastType | null;
};
export type ToastType = {
  title: string;
  message?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
};
const initialState: ToastState = {
  toast: null,
};

export const uiSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastType>) => {
      console.log('setToast', action.payload);
      state.toast = {
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state) => {
      state.toast = {
        title: `Your story has been published!`,
        variant: 'success',
      };
    });
    builder
      .addMatcher(
        isAnyOf(
          login.rejected,
          register.rejected,
          uploadImage.rejected,
          updateUser.rejected,
        ),
        (state, action) => {
          state.toast = {
            title: 'Error',
            message: action.error.message,
            variant: 'error',
          };
        },
      )
      .addMatcher(isAnyOf(login.pending, register.pending), (state, action) => {
        state.toast = {
          title: 'Processing...',
          variant: 'info',
        };
      })
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled),
        (state, action) => {
          state.toast = {
            title: 'Success',
            variant: 'success',
          };
        },
      );
  },
});

export const { setToast } = uiSlice.actions;

export default uiSlice.reducer;
