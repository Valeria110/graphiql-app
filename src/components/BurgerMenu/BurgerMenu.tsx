import Link from 'next/link';
import styles from './BurgerMenu.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

export default function BurgerMenu() {
  const [navClass, setNavClass] = useState(styles.nav);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [burgerBtnClass, setBurgerBtnClass] = useState(styles.burgerBtn);

  const isUserSignedIn = false; //Here will be the check whether a user is signed in
  const handleChange = () => {
    //To be done:
    //change the language in the whole application
  };
  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setNavClass(isMenuOpen ? styles.nav : classNames(styles.nav, styles.open));
    setBurgerBtnClass(isMenuOpen ? styles.burgerBtn : classNames(styles.burgerBtn, styles.clicked));
  };

  return (
    <>
      <button onClick={toggleBurgerMenu} className={burgerBtnClass}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>
      <nav className={navClass}>
        <ul className={styles.navList}>
          {isUserSignedIn ? (
            <Link className={styles.navLink} href="/sign-out">
              Sign Out
            </Link>
          ) : (
            <>
              <Link className={styles.navLink} href="/sign-up">
                Sign Up
              </Link>
              <Link className={styles.navLink} href="/sign-in">
                Sign In
              </Link>
            </>
          )}
          <select defaultValue="En" onChange={handleChange} className={styles.langSelect}>
            <option value="En">En</option>
            <option value="Рус">Рус</option>
          </select>
        </ul>
      </nav>
    </>
  );
}
