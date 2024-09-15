import Link from 'next/link';
import styles from './Footer.module.scss';
import Image from 'next/image';
import rssLogo from '../../assets/svg/rss-logo.svg';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.authors}>
        <Link className={styles.link} href="https://github.com/Valeria110" target="_blank">
          Valeria110
        </Link>
        <Link className={styles.link} href="https://github.com/MikhailSemenuk" target="_blank">
          MikhailSemenuk
        </Link>
        <Link className={styles.link} href="https://github.com/qwgfsehte" target="_blank">
          qwgfsehte
        </Link>
      </div>
      <div className={styles.courseInfo}>
        <Link className={styles.link} href="https://rs.school/courses/reactjs" target="_blank">
          <Image src={rssLogo} alt="rss logo" width={35} height={35} />
        </Link>
        <p className={styles.courseInfoYear}>2024</p>
      </div>
    </div>
  );
}
