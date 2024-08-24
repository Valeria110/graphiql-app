'use client';

import { useUser } from '@/hooks/authHook';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();

  if (user === false) {
    return <h1 style={{ marginTop: '200px' }}>Loading...</h1>;
  } else if (!user) {
    return (
      <h1>
        Please, sign in to open the graphql playground <Link href="/sign_in">Sign in</Link>
      </h1>
    );
  } else {
    return children;
  }
}
