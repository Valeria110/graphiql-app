'use client';

import Loader from '@/components/Loader/Loader';
import LoginRequired from '@/components/LoginRequired/LoginRequired';
import { useUser } from '@/hooks/authHook';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();

  if (user === false) {
    return <Loader />;
  } else if (!user) {
    return <LoginRequired serviceName="GraphQL" />;
  } else {
    return children;
  }
}
