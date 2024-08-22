'use client';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import welcomePageStyles from './welcomePageStyles.module.scss';
import restLogo from '../../assets/rest-api-logo.png';
import graphQLLogo from '../../assets/graphQL-logo.png';
import Image from 'next/image';
import { logInWithEmailAndPassword } from '@/authService';
import { customUserName } from '@/utils/customNameUser';
import Link from 'next/link';
import { TeamList } from '@/components/TeamList/TeamList';

function WelcomePage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading</div>;
  }

  const onClickLogin = async () => {
    logInWithEmailAndPassword('test@gmail.com', '3cFj49D63@');
  };

  console.log(user);

  return (
    <div className={welcomePageStyles['welcome-page']}>
      <button onClick={onClickLogin}>Login</button>
      <section className={welcomePageStyles['section-welcome']}>
        <div className={welcomePageStyles['section-welcome__info-container']}>
          <h2 className={welcomePageStyles['section-welcome__title']}>
            {user ? `Hello, ${customUserName(user?.email || 'user')}!` : 'Hello!'}
          </h2>
          <h3 className={welcomePageStyles['section-welcome__subtitle']}>
            Welcome to a lightweight and powerful application for working with REST and GraphQL API.
          </h3>
          <p className={welcomePageStyles['section-welcome__description']}>
            We have combined the capabilities of Postman and GraphiQL in one simple and convenient application.
          </p>
          {user ? (
            <div className={welcomePageStyles['section-welcome__navigate-buttons']}>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/'}>
                REST Client
              </Link>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/'}>
                GraphiQL Client
              </Link>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/'}>
                History{' '}
              </Link>
            </div>
          ) : (
            <div className={welcomePageStyles['section-welcome__navigate-buttons']}>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/sign_in'}>
                Sign In
              </Link>
              <Link className={welcomePageStyles['section-welcome__navigate-button']} href={'/sign_up'}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className={welcomePageStyles['section-welcome__logos-container']}>
          <Image
            className={welcomePageStyles['section-welcome__img']}
            src={restLogo}
            alt="logo"
            width={230}
            height={170}
            priority
          />
          +
          <Image
            className={welcomePageStyles['section-welcome__img']}
            src={graphQLLogo}
            alt="logo"
            width={200}
            height={220}
            priority
          />
        </div>
      </section>
      <section className={welcomePageStyles['section-team']}>
        <h2 className={welcomePageStyles['section-team__title']}>Our team</h2>
        <h3 className={welcomePageStyles['section-team__subtitle']}>Jumping Skunk</h3>
        <TeamList />
      </section>
    </div>
  );
}

export default WelcomePage;
