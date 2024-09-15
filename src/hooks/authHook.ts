import { auth } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<User | false | null>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}
