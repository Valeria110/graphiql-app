import Image from 'next/image';
import sectionWelcomeStyles from '../../app/[locale]/welcomePageStyles.module.scss';
import restLogo from '../../assets/rest-api-logo.png';
import graphQLLogo from '../../assets/graphQL-logo.png';
import Link from 'next/link';
import { customUserName } from '@/utils/customNameUser';
import { useLocale } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { PagesRoutes, SectionsProps } from '@/types/types';

export default function SectionWelcome({ t }: SectionsProps) {
  const localActive = useLocale();
  const [user] = useAuthState(auth);

  return (
    <section className={sectionWelcomeStyles['section-welcome']}>
      <div className={sectionWelcomeStyles['section-welcome__info-container']}>
        <h2 className={sectionWelcomeStyles['section-welcome__title']}>
          {user
            ? `${t('sectionWelcomeTitle')}, ${customUserName(user?.email || 'user')}!`
            : `${t('sectionWelcomeTitle')}!`}
        </h2>
        <h3 className={sectionWelcomeStyles['section-welcome__subtitle']}>{t('sectionWelcomeSubtitle')}</h3>
        <p className={sectionWelcomeStyles['section-welcome__description']}>{t('sectionWelcomeDescription')}</p>
        {user ? (
          <div className={sectionWelcomeStyles['section-welcome__navigate-buttons']}>
            <Link
              className={sectionWelcomeStyles['section-welcome__navigate-button']}
              href={`/${localActive}/${PagesRoutes.RESTFul}`}
            >
              {t('sectionWelcomeBtnRestClient')}
            </Link>
            <Link
              className={sectionWelcomeStyles['section-welcome__navigate-button']}
              href={`/${localActive}/${PagesRoutes.Graphql}`}
            >
              {t('sectionWelcomeBtnGraphiQLClient')}
            </Link>
            <Link
              className={sectionWelcomeStyles['section-welcome__navigate-button']}
              href={`/${localActive}/${PagesRoutes.History}`}
            >
              {t('sectionWelcomeBtnHistory')}
            </Link>
          </div>
        ) : (
          <div className={sectionWelcomeStyles['section-welcome__navigate-buttons']}>
            <Link
              className={sectionWelcomeStyles['section-welcome__navigate-button']}
              href={`/${localActive}/${PagesRoutes.SignIn}`}
            >
              {t('sectionWelcomebtnSignIn')}
            </Link>
            <Link
              className={sectionWelcomeStyles['section-welcome__navigate-button']}
              href={`/${localActive}/${PagesRoutes.SignUp}`}
            >
              {t('sectionWelcomebtnSignUp')}
            </Link>
          </div>
        )}
      </div>
      <div className={sectionWelcomeStyles['section-welcome__logos-container']}>
        <Image
          className={sectionWelcomeStyles['section-welcome__logo']}
          src={restLogo}
          alt="restLogo"
          width={230}
          height={170}
          priority
        />
        +
        <Image
          className={sectionWelcomeStyles['section-welcome__logo']}
          src={graphQLLogo}
          alt="graphQLLogo"
          width={200}
          height={220}
          priority
        />
      </div>
    </section>
  );
}
