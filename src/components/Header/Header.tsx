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

export default function Header() {
  const [user] = useAuthState(auth);
  const isUserSignedIn = Boolean(user); //Here will be the check whether a user is signed in

  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const headerClassName = isSticky ? classNames(styles.header, styles.isSticky) : styles.header;
  const router = useRouter();

  const handleChange = () => {
    //To be done:
    //change the language in the whole application
  };

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
    router.push('/sign_in');
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
            <button className={classNames(styles.signOutBtn, styles.headerBtn)} onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <>
              <button className={classNames(styles.signInBtn, styles.headerBtn)} onClick={handleSignIn}>
                Sign In
              </button>
            </>
          )}
          <select defaultValue="En" onChange={handleChange} className={styles.langSelect}>
            <option className={styles.option} value="En">
              En
            </option>
            <option className={styles.option} value="Рус">
              Рус
            </option>
          </select>
        </div>
      )}
    </div>
  );
}
