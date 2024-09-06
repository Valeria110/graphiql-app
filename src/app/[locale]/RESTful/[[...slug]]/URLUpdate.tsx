'use client';
import { RootState } from '@/store/store';
import { useLocale } from 'next-intl';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const URLUpdate = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const localActive = useLocale();
  const urlInner = useSelector((state: RootState) => state.RESTFul.urlInner);
  useEffect(() => {
    replaceURL(router, localActive as 'en' | 'ru', urlInner);
  }, [urlInner]);

  return <>{children}</>;
};

function replaceURL(router: AppRouterInstance, locale: 'en' | 'ru', urlInner: string) {
  const currentURL = new URL(window.location.href);

  const newURL = new URL(currentURL);
  newURL.pathname = `/${locale}/RESTful/` + (urlInner ?? '');

  router.replace(newURL.toString(), undefined);
}
