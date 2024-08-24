'use client';

import { useUser } from '@/hooks/authHook';
import { PagesRoutes } from '@/types/types';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  const localActive = useLocale();

  if (user === false) {
    return <h1 style={{ marginTop: '200px' }}>Loading...</h1>;
  } else if (!user) {
    return (
      <h1>
        Please, sign in to open the graphql playground{' '}
        <Link href={`/${localActive}/${PagesRoutes.SignIn}`}>Sign in</Link>
      </h1>
    );
  } else {
    return children;
  }
}
