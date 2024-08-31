'use client';

import Link from 'next/link';
import styles from './BurgerMenu.module.scss';
import { ChangeEvent, useState, useTransition } from 'react';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { PagesRoutes } from '@/types/types';
import { logOutUser } from '@/authService';
import HomeBtn from '../Header/HomeBtn/HomeBtn';

export default function BurgerMenu() {
  const [navClass, setNavClass] = useState(styles.nav);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [burgerBtnClass, setBurgerBtnClass] = useState(styles.burgerBtn);
  const localActive = useLocale();
  const [user] = useAuthState(auth);
  const isUserSignedIn = !!user;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('BurgerMenu');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    const newPathname = pathname.replace(`/${localActive}`, `/${selectedLanguage}`);

    startTransition(() => {
      router.replace(newPathname);
    });
  };
  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setNavClass(isMenuOpen ? styles.nav : classNames(styles.nav, styles.open));
    setBurgerBtnClass(isMenuOpen ? styles.burgerBtn : classNames(styles.burgerBtn, styles.clicked));
  };

  const handleSignOut = () => {
    logOutUser();
    toggleBurgerMenu();
  };

  const handleSignIn = () => {
    toggleBurgerMenu();
  };

  const returnHomePage = () => {
    router.push(`/${localActive}`);
    toggleBurgerMenu();
  };

  return (
    <>
      <HomeBtn handleCLick={returnHomePage} />
      <button onClick={toggleBurgerMenu} className={burgerBtnClass} data-testid="burgerToggleBtn">
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>
      <nav className={navClass} data-testid="burgerNav">
        <ul className={styles.navList}>
          {isUserSignedIn ? (
            <Link className={styles.navLink} href={`/${localActive}`} onClick={handleSignOut}>
              {t('signOutBtn')}
            </Link>
          ) : (
            <Link className={styles.navLink} href={`/${localActive}/${PagesRoutes.SignIn}`} onClick={handleSignIn}>
              {t('signInBtn')}
            </Link>
          )}
          <select defaultValue={localActive} onChange={handleChange} className={styles.langSelect} disabled={isPending}>
            <option value="en">En</option>
            <option value="ru">Рус</option>
          </select>
        </ul>
      </nav>
    </>
  );
}
