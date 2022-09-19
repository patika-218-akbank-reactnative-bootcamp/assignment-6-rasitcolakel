import { auth, db, storage } from '@src/config/firebase';
import { LoginForm } from '@src/screens/auth/Login';
import { RegisterForm } from '@src/screens/auth/Register';
import { UserType } from '@src/store/slices/userSlice';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
  await saveUserToFirestore(response);
  return response;
};

export const logout = async () => {
  const response = await auth.signOut();
  return response;
};

export async function saveUserToFirestore(user: UserCredential): Promise<void> {
  const userDoc = doc(db, 'users', user.user.uid);
  const docData = {
    id: user.user.uid,
    email: user.user.email,
    displayName: user.user.displayName,
    photoURL: user.user.photoURL,
  };
  const response = await setDoc(userDoc, docData);
  console.log('User saved to Firestore ', response);
  return response;
}

export async function updateUser(user: Partial<UserType>): Promise<void> {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userDoc = doc(db, 'users', currentUser?.uid);
    const docData = {
      ...user,
    };
    const response = await updateDoc(userDoc, docData);

    console.log('User updated to Firestore ', response);
    return response;
  }
}

export async function uploadImage(uri: string) {
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  // strong random text
  const randomId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const fileRef = ref(storage, randomId);
  await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}

export async function getUsersWithLocation() {
  const q = query(collection(db, 'users'), where('photoURL', '!=', null));

  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => doc.data()) as UserType[];
  return users.filter((u) => u.location);
}
