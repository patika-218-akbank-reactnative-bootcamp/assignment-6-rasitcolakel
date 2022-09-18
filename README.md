[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8538342&assignment_repo_type=AssignmentRepo)
# React Native Bootcamp Assignment 6

# NativeBase TypeScript Expo Template

This project is created with official NativeBase TypeScript template for [Expo](https://docs.expo.io/)

## Usage

```sh
expo init my-app --template @native-base/expo-template-typescript
```

<h3>Used Libraries and Dependencies</h3>

1. [NativeBase](#nativebase)
2. [React Navigation](#react-navigation)
3. [Firebase](#firebase)
4. [Redux](#redux)
5. [Redux Toolkit](#redux-toolkit)

<h3 id="nativebase">1. NativeBase</h3>
NativeBase is a free and open source UI component library for React Native to build native mobile apps for iOS and Android platforms. It is a framework of high-quality UI components for React Native to build native mobile apps for iOS and Android platforms. It is built on top of the React Native framework and it allows you to use the platform’s APIs natively.

<h4>Installation</h4>

```sh
npm install native-base --save
```

<h4>Usage</h4>

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

<h4>Installation</h4>

```sh
npm install @react-navigation/native
# Dependencies for Expo Managed Project
npx expo install react-native-screens react-native-safe-area-context

# Bottom Tabs and Stack navigators
npm install @react-navigation/bottom-tabs @react-navigation/stack

npx expo install react-native-gesture-handler

```

<h4>Usage</h4>

```tsx
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return <NavigationContainer>...</NavigationContainer>;
}
```

<h3 id="firebase"> 3. Firebase</h3>
Firebase is a Backend-as-a-Service (BaaS) app development platform that provides hosted backend services such as a realtime database, cloud storage, authentication, crash reporting, machine learning, remote configuration, and hosting for your static files.

<h4>Installation</h4>

```sh
npm install firebase
```

<h4>Usage</h4>

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

<h4>Installation</h4>

```sh
npm install redux react-redux
```

<h4>Usage</h4>

```tsx
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return <Provider store={store}>{/* ... */}</Provider>;
}
```

<h3 id="redux-toolkit"> 5. Redux Toolkit</h3>
Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It is intended to be the standard way to write Redux logic.

<h4>Installation</h4>

```sh
npm install @reduxjs/toolkit
```

<h4>Usage</h4>

```tsx
import themeReducer from '../themeReducer';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    theme: themeReducer,
  },
});
```
