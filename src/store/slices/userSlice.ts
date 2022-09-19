import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { LoginForm } from '@src/screens/auth/Login';
import { RegisterForm } from '@src/screens/auth/Register';
import * as FirebaseService from '@src/services/firebaseService';
import * as SecureStore from 'expo-secure-store';

export type UserState = {
  refreshToken: string | null;
  user: UserType | null;
};
export type UserType = {
  id: string;
  email?: string;
  displayName?: string;
};
const initialState: UserState = {
  refreshToken: null,
  user: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (values: LoginForm) => {
    const login = await FirebaseService.login(values);
    const userState: UserState = {
      refreshToken: login.user.refreshToken,
      user: {
        id: login.user.uid,
        email: login.user.email || '',
        displayName: login.user.displayName || '',
      },
    };
    await SecureStore.setItemAsync('user', JSON.stringify(userState));
    return userState;
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (values: RegisterForm): Promise<UserState> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const login = await FirebaseService.register(values);
    const userState: UserState = {
      refreshToken: login.user.refreshToken,
      user: {
        id: login.user.uid,
        email: login.user.email || '',
        displayName: login.user.displayName || '',
      },
    };
    await SecureStore.setItemAsync('user', JSON.stringify(userState));
    return userState;
  },
);

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.refreshToken = action.payload.refreshToken;
    },
    logOut: (state) => {
      state = {
        ...initialState,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled),
      (state, action: PayloadAction<UserState>) => {
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
      },
    );
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
