import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClientRedirect = () => {
  const router = useRouter();
  const [wasAuthenticated, setWasAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setWasAuthenticated(true);
        return;
      }

      if (wasAuthenticated) {
        router.push('/welcome');
      }
    });

    return () => unsubscribe();
  }, [router, wasAuthenticated]);

  return null;
};

export default ClientRedirect;
