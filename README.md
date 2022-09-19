[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8538342&assignment_repo_type=AssignmentRepo)

<h1>React Native Bootcamp Assignment 6</h1>

<h1>NativeBase TypeScript Expo Template</h1>

This project is created with official NativeBase TypeScript template for [Expo](https://docs.expo.io/)

<h2>Usage</h2>

```sh
expo init my-app --template @native-base/expo-template-typescript
```

<h3>Used Libraries and Dependencies</h3>

1. [NativeBase](#nativebase)
   1. [Installation](#nativebase-installation)
   2. [Usage](#nativebase-usage)
2. [React Navigation](#react-navigation)
   1. [Installation](#react-navigation-installation)
   2. [Usage](#react-navigation-usage)
3. [Firebase](#firebase)
   1. [Installation](#firebase-installation)
   2. [Usage](#firebase-usage)
4. [Redux](#redux)
   1. [Installation](#redux-installation)
   2. [Usage](#redux-usage)
5. [Redux Toolkit](#redux-toolkit)
   1. [Installation](#redux-toolkit-installation)
   2. [Usage](#redux-toolkit-usage)
6. [React Hook Form](#react-hook-form)
   1. [Installation](#react-hook-form-installation)
   2. [Usage](#react-hook-form-usage)
7. [Secure Store](#secure-store)]
   1. [Installation](#secure-store-installation)
   2. [Usage](#secure-store-usage)

<h3 id="nativebase">1. NativeBase</h3>
NativeBase is a free and open source UI component library for React Native to build native mobile apps for iOS and Android platforms. It is a framework of high-quality UI components for React Native to build native mobile apps for iOS and Android platforms. It is built on top of the React Native framework and it allows you to use the platform’s APIs natively.

<h4 id="nativebase-installation">Installation</h4>

```sh
npm install native-base --save
```

<h4 id="nativebase-usage">Usage</h4>

To use NativeBase components, wrap your root component with the NativeBaseProvider component.

```tsx
import { App } from './App';
import { NativeBaseProvider } from 'native-base';

export default function Main() {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  );
}
```

<h3 id="react-navigation"> 2. React Navigation</h3>
React Navigation is a library that provides a way to navigate between screens in your app. It is built on top of the React Native API and provides a number of navigators that you can use to navigate between screens.

<h4 id="react-navigation-installation">Installation</h4>

```sh
npm install @react-navigation/native
# Dependencies for Expo Managed Project
npx expo install react-native-screens react-native-safe-area-context

# Bottom Tabs and Stack navigators
npm install @react-navigation/bottom-tabs @react-navigation/stack

npx expo install react-native-gesture-handler

```

<h4 id="react-navigation-usage">Usage</h4>

```tsx
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return <NavigationContainer>...</NavigationContainer>;
}
```

<h3 id="firebase"> 3. Firebase</h3>
Firebase is a Backend-as-a-Service (BaaS) app development platform that provides hosted backend services such as a realtime database, cloud storage, authentication, crash reporting, machine learning, remote configuration, and hosting for your static files.

<h4 id="firebase-installation">Installation</h4>

```sh
npm install firebase
```

<h4 id="firebase-usage">Usage</h4>

```tsx
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth to use signup and login
export const auth = getAuth(app);

// Initialize Firebase firestore to use database
export const db = getFirestore(app);
```

<h3 id="redux"> 4. Redux</h3>
Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

<h4 id="redux-installation">Installation</h4>

```sh
npm install redux react-redux
```

<h4 id="redux-usage">Usage</h4>

```tsx
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return <Provider store={store}>{/* ... */}</Provider>;
}
```

<h3 id="redux-toolkit"> 5. Redux Toolkit</h3>
Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It is intended to be the standard way to write Redux logic.

<h4 id="redux-toolkit-installation">Installation</h4>

```sh
npm install @reduxjs/toolkit
```

<h4 id="redux-toolkit-usage">Usage</h4>

```tsx
import themeReducer from '../themeReducer';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    theme: themeReducer,
  },
});
```

<h4 id="redux-toolkit-cat">createAsyncThunk</h4>
createAsyncThunk is a Redux Toolkit utility function for creating async action creators. It accepts a single string argument, which is used as the prefix for the generated action types, and a callback function that should return a Promise.

```tsx
import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 *
 * createAsyncThunk will generate the following action types:
 *? user/login/pending
 *? user/login/fulfilled
 *? user/login/rejected
 */
const login = createAsyncThunk('user/login', async (credentials) => {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
});

/**
 * we can access the action types via the `login` object in extraReducers
 */

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // when the login action is dispatched, the `pending` action type will be dispatched
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    // when the login action is fulfilled, the `fulfilled` action type will be dispatched
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    // when the login action is rejected, the `rejected` action type will be dispatched
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },

```

<h3 id="react-hook-form"> 6. React Hook Form</h3>
React Hook Form is a performant, flexible and extensible forms with easy-to-use validation. It supports both uncontrolled and controlled components and will work with any UI library.

<h4 id="react-hook-form-installation">Installation</h4>

```sh
npm install react-hook-form
```

<h4 id="react-hook-form-usage">Usage</h4>

```tsx
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <View>
      <TextInput
        name="firstName"
        ref={register}
        onChangeText={(text) => setValue('firstName', text)}
      />
      <TextInput
        name="lastName"
        ref={register}
        onChangeText={(text) => setValue('lastName', text)}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

<h3 id="secure-store"> 7. Secure Store</h3>
SecureStore is a key-value storage system that is similar to AsyncStorage, but provides a secure storage for sensitive data. SecureStore uses the Keychain Services on iOS and the Keystore on Android.

<h4 id="secure-store-installation">Installation</h4>

```sh
expo install expo-secure-store
```

<h4 id="secure-store-usage">Usage</h4>

```tsx
import * as SecureStore from 'expo-secure-store';

// setItem
await SecureStore.setItemAsync('key', 'value');

// getItem
const value = await SecureStore.getItemAsync('key');

// deleteItem
await SecureStore.deleteItemAsync('key');
```
