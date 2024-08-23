'use client';

import styles from './Header.module.scss';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
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
    router.replace(`/${localActive}/sign_in`);
  };

  const handleSignUp = () => {
    router.replace(`/${localActive}/sign_up`);
  };

  const handleSignOut = () => {
    logOutUser();
  };

  return (
    <div className={headerClassName}>
      <button onClick={() => router.push('/')} className={styles.homeBtn}>
        <HomeRoundedIcon sx={{ fontSize: 30 }} />
      </button>
      {screenWidth <= 768 ? (
        <BurgerMenu />
      ) : (
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
      )}
    </div>
  );
}
