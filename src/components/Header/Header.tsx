'use client';

import styles from './Header.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { logOutUser } from '@/authService';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { Button } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { PagesRoutes } from '@/types/types';
import HomeBtn from './HomeBtn/HomeBtn';

export default function Header() {
  const [user] = useAuthState(auth);
  const isUserSignedIn = Boolean(user);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const headerClassName = isSticky ? classNames(styles.header, styles.isSticky) : styles.header;
  const router = useRouter();
  const t = useTranslations('AuthPages');
  const localActive = useLocale();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    setScreenWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const curScrollPosition = window.scrollY;
    const headerHeight = 100;

    if (curScrollPosition > headerHeight) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleSignIn = () => {
    router.replace(`/${localActive}/${PagesRoutes.SignIn}`);
  };

  const handleSignUp = () => {
    router.replace(`/${localActive}/${PagesRoutes.SignUp}`);
  };

  const handleSignOut = () => {
    logOutUser();
  };

  return (
    <div className={headerClassName}>
      {screenWidth <= 768 ? (
        <BurgerMenu />
      ) : (
        <>
          <HomeBtn handleCLick={() => router.push('/')} />
          <div className={styles.rightBtnsWrapper}>
            {isUserSignedIn ? (
              <Button variant="contained" color="secondary" onClick={handleSignOut}>
                {t('btnSignOut')}
              </Button>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={handleSignIn}>
                  {t('btnSignIn')}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSignUp}
                  sx={{ whiteSpace: 'nowrap', paddingX: 4 }}
                >
                  {t('btnSignUp')}
                </Button>
              </>
            )}
            <LocaleSwitcher />
          </div>
        </>
      )}
    </div>
  );
}
