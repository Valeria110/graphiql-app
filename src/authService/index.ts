import { auth, db } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    console.error(err); // TODO: нужно доделать обработку ошибок на странице регистрации и логина
    return false;
  }
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const registerWithEmailAndPasswordShort = async (email: string, password: string) => {
  const name = email.split('@')[0];
  return registerWithEmailAndPassword(name, email, password);
};

export const logOutUser = async () => {
  await signOut(auth);
};
