'use client';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import welcomePageStyles from './welcomePageStyles.module.scss';
import { useTranslations } from 'next-intl';
import SectionWelcome from '@/components/SectionWelcome/SectionWelcome';
import SectionProject from '@/components/SectionProject/SectionProject';
import SectionTeam from '@/components/SectionTeam/SectionTeam';
import SectionCourse from '@/components/SectionCourse/SectionCourse';
import Loader from '@/components/Loader/Loader';

function WelcomePage() {
  const [, loading] = useAuthState(auth);
  const t = useTranslations('WelcomePage');

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={welcomePageStyles['welcome-page']}>
      <SectionWelcome t={t} />
      <SectionProject t={t} />
      <SectionTeam t={t} />
      <SectionCourse t={t} />
    </div>
  );
}

export default WelcomePage;
