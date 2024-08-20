'use client';

import styles from './Header.module.scss';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useRouter } from 'next/navigation';

export default function Header() {
  const isUserSignedIn = false; //Here will be the check whether a user is signed in
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const headerClassName = isSticky ? classNames(styles.header, styles.isSticky) : styles.header;
  const router = useRouter();
  console.log(screenWidth);

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

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    const curScrollPosition = window.scrollY;
    const headerHeight = 100;
    console.log(curScrollPosition);

    if (curScrollPosition > headerHeight) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
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
            <button className={classNames(styles.signOutBtn, styles.headerBtn)}>Sign Out</button>
          ) : (
            <>
              <button className={classNames(styles.signUpBtn, styles.headerBtn)}>Sign Up</button>
              <button className={classNames(styles.signInBtn, styles.headerBtn)}>Sign In</button>
            </>
          )}
          <select defaultValue="En" onChange={handleChange} className={styles.langSelect}>
            <option value="En">En</option>
            <option value="Рус">Рус</option>
          </select>
        </div>
      )}
    </div>
  );
}
