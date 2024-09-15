'use client';

import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClientRedirect = () => {
  const router = useRouter();
  const localActive = useLocale();

  const [wasAuthenticated, setWasAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setWasAuthenticated(true);
        return;
      }

      if (wasAuthenticated) {
        router.push(`/${localActive}/`);
      }
    });

    return () => unsubscribe();
  }, [localActive, router, wasAuthenticated]);

  return null;
};

export default ClientRedirect;
