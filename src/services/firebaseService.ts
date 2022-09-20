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

export async function seedUsers() {
  //users.map(async (user) => {
  // const userDoc = doc(db, 'users', user.id);
  // const docData = {
  //   ...user,
  //   location: {
  //     latitude: parseInt(user.location?.latitude.toString()),
  //     longitude: parseInt(user.location?.longitude),
  //   },
  // };
  // const response = await updateDoc(userDoc, docData);
  // if (user.id.length < '2Ek0tb88eANP5I66VC1GeI1zmDR2'.length) {
  //   deleteDoc(doc(db, 'users', user.id));
  // }
  //});
  const locations = [
    {
      latitude: 40.1311,
      longitude: 33.082664,
    },
    {
      latitude: 39.941975,
      longitude: 32.854408,
    },
    {
      latitude: 40.019428,
      longitude: 32.332207,
    },
    {
      latitude: 39.553375,
      longitude: 33.123772,
    },
    {
      latitude: 40.168217,
      longitude: 31.920441,
    },

    {
      latitude: 39.885353,
      longitude: 32.855339,
    },

    {
      latitude: 39.922131,
      longitude: 33.226265,
    },
    {
      latitude: 39.948952,
      longitude: 32.662109,
    },
    {
      latitude: 39.020237,
      longitude: 33.805794,
    },
    {
      latitude: 39.798294,
      longitude: 32.805752,
    },

    {
      latitude: 40.205166,
      longitude: 32.681183,
    },

    {
      latitude: 39.978668,
      longitude: 32.871296,
    },
    {
      latitude: 40.470348,
      longitude: 32.650204,
    },
    {
      latitude: 39.932274,
      longitude: 32.907276,
    },

    {
      latitude: 38.937889,
      longitude: 33.539162,
    },
    {
      latitude: 39.962273,
      longitude: 32.811054,
    },
  ];

  const users = locations.map((l) => {
    return {
      id: Math.random().toString(36).substring(2, 15),
      email: '',
      displayName: 'John Doe',
      location: { ...l },
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/snapchat-clone-assignment-6.appspot.com/o/aalzh89r30p?alt=media&token=7dbc0395-544d-464b-bac5-97f34ba29071',
    };
  });
  users.forEach(async (u) => {
    const userDoc = doc(db, 'users', u.id);
    const docData = {
      ...u,
    };
    await setDoc(userDoc, docData);
    console.log('User saved to Firestore ', u.id);
  });
}
