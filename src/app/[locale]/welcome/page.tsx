'use client';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import welcomePageStyles from './welcomePageStyles.module.scss';
import restLogo from '../../../assets/rest-api-logo.png';
import graphQLLogo from '../../../assets/graphQL-logo.png';
import rssLogo from '../../../assets/svg/rs-school.svg';
import Image from 'next/image';
import { customUserName } from '@/utils/customNameUser';
import Link from 'next/link';
import { TeamList } from '@/components/TeamList/TeamList';
import { useLocale, useTranslations } from 'next-intl';
import { splitString } from '@/utils/splitString';

function WelcomePage() {
  const [user, loading] = useAuthState(auth);
  const localActive = useLocale();
  const t = useTranslations('WelcomePage');

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className={welcomePageStyles['welcome-page']}>
      <section className={welcomePageStyles['section-welcome']}>
        <div className={welcomePageStyles['section-welcome__info-container']}>
          <h2 className={welcomePageStyles['section-welcome__title']}>
            {user
              ? `${t('sectionWelcomeTitle')}, ${customUserName(user?.email || 'user')}!`
              : `${t('sectionWelcomeTitle')}!`}
          </h2>
          <h3 className={welcomePageStyles['section-welcome__subtitle']}>{t('sectionWelcomeSubtitle')}</h3>
          <p className={welcomePageStyles['section-welcome__description']}>{t('sectionWelcomeDescription')}</p>
          {user ? (
            <div className={welcomePageStyles['section-welcome__navigate-buttons']}>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/'}>
                {t('sectionWelcomeBtnRestClient')}
              </Link>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/'}>
                {t('sectionWelcomeBtnGraphiQLClient')}
              </Link>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/'}>
                {t('sectionWelcomeBtnHistory')}
              </Link>
            </div>
          ) : (
            <div className={welcomePageStyles['section-welcome__navigate-buttons']}>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={`/${localActive}/sign_in`}>
                {t('sectionWelcomebtnSignIn')}
              </Link>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={`/${localActive}/sign_up`}>
                {t('sectionWelcomebtnSignUp')}
              </Link>
            </div>
          )}
        </div>
        <div className={welcomePageStyles['section-welcome__logos-container']}>
          <Image
            className={welcomePageStyles['section-welcome__logo']}
            src={restLogo}
            alt="logo"
            width={230}
            height={170}
            priority
          />
          +
          <Image
            className={welcomePageStyles['section-welcome__logo']}
            src={graphQLLogo}
            alt="logo"
            width={200}
            height={220}
            priority
          />
        </div>
      </section>
      <section className={welcomePageStyles['section-project']}>
        <h2 className={welcomePageStyles['section-project__title']}>{t('sectionProjectTitle')}</h2>
        <div className={welcomePageStyles['section-project__description']}>
          <p className={welcomePageStyles['section-project__subtitle']}>{t('sectionProjectSubtitle')}</p>
          <ul className={welcomePageStyles['section-project__list']}>
            {splitString(t('sectionProjectList')).map((line, index: number) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          <p>{t('sectionProjecDescriptionText')}</p>
        </div>
      </section>
      <section className={welcomePageStyles['section-team']}>
        <h2 className={welcomePageStyles['section-team__title']}>{t('sectionTeamTitle')}</h2>
        <h3 className={welcomePageStyles['section-team__subtitle']}>Jumping Skunk</h3>
        <TeamList />
      </section>
      <section className={welcomePageStyles['section-course']}>
        <h2 className={welcomePageStyles['section-course__title']}>{t('sectionCourseTitle')}</h2>
        <h3 className={welcomePageStyles['section-course__subtitle']}>{t('sectionCourseSubtitle')}</h3>
        <div className={welcomePageStyles['section-course__description-container']}>
          <div className={welcomePageStyles['section-course__description']}>
            <div className={welcomePageStyles['section-course__description-title']}>
              {t('sectionCourseDescriptionTitle')}
            </div>
            {splitString(t('sectionCourseFeature')).map((line, index: number) => (
              <div key={index}>
                {line}
                <br />
              </div>
            ))}
            <div className={welcomePageStyles['section-course__description-text']}>
              {t('sectionCourseDescriptionText')}
            </div>
          </div>
          <a
            className={welcomePageStyles['section-course__link']}
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={welcomePageStyles['section-course__logo']}
              src={rssLogo}
              alt="rss-logo"
              width={200}
              height={220}
              priority
            />
          </a>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
