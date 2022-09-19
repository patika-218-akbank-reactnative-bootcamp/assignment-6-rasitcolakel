import { auth } from '@src/config/firebase';
import { LoginForm } from '@src/screens/auth/Login';
import { RegisterForm } from '@src/screens/auth/Register';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const login = async ({
  email,
  password,
}: LoginForm): Promise<UserCredential> => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const register = async ({
  email,
  password,
}: RegisterForm): Promise<UserCredential> => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const logout = async () => {
  const response = await auth.signOut();
  return response;
};
