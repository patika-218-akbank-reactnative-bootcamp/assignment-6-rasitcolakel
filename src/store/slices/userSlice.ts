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
  firstName?: string;
  lastName?: string;
  photoURL: string;
  userImage?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  currentLocation?: {
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
        photoURL: '',
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
        photoURL: '',
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

export const changeImage = createAsyncThunk(
  'user/changeImage',
  async (uri: string, { dispatch }) => {
    const image = await FirebaseService.uploadImage(uri);
    await dispatch(updateProfile({ userImage: image }));
  },
);

type UpdateProfilePayload = {
  userImage?: string;
  displayName?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
};

export const changeImageAndUpdate = createAsyncThunk(
  'user/changeImageAndUpdate',
  async (values: UpdateProfilePayload, { dispatch }) => {
    console.log('changeImageAndUpdate', values);
    if (values.userImage) {
      const image = await FirebaseService.uploadImage(values.userImage);
      values.userImage = image;
    }
    await dispatch(updateProfile(values));
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (values: Partial<UserType>) => {
    await FirebaseService.updateUser(values);
    const user = await FirebaseService.getCurrentUser();
    return user;
  },
);

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    const user = await FirebaseService.getCurrentUser();
    return user;
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
    setCurrentLocation: (state, action: PayloadAction<Partial<UserType>>) => {
      if (state.user) {
        state.user.currentLocation = action.payload.currentLocation;
      }
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
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.user = {
            currentLocation: state.user?.currentLocation,
            ...action.payload,
          };
        },
      )
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.user = {
            currentLocation: state.user?.currentLocation,
            ...action.payload,
          };
        },
      );
    builder.addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled),
      (state, action: PayloadAction<UserState>) => {
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
      },
    );
  },
});

export const { setUser, logOut, setCurrentLocation } = userSlice.actions;

export default userSlice.reducer;
