import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { ShareImageFormData } from '@src/screens/app/BottomTabs/Home';
import { LoginForm } from '@src/screens/auth/Login';
import { RegisterForm } from '@src/screens/auth/Register';
import * as FirebaseService from '@src/services/firebaseService';
import * as SecureStore from 'expo-secure-store';

export type UserState = {
  refreshToken: string | null;
  user: UserType | null;
  loading?: boolean;
  users?: UserType[];
};
export type UserType = {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
};
const initialState: UserState = {
  refreshToken: null,
  user: null,
  loading: false,
  users: [],
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

export const logout = createAsyncThunk('user/logout', async () => {
  await FirebaseService.logout();
  await SecureStore.deleteItemAsync('user');
  return null;
});

export const uploadImage = createAsyncThunk(
  'user/share',
  async (values: ShareImageFormData, { dispatch }) => {
    const image = await FirebaseService.uploadImage(values.image);

    await dispatch(updateUser({ photoURL: image, location: values.location }));
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (values: Partial<UserType>) => {
    await FirebaseService.updateUser(values);
  },
);

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const users = await FirebaseService.getUsersWithLocation();
  return users;
});

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state = {
          ...initialState,
        };
        return state;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
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
