'use client';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import welcomePageStyles from './welcomePageStyles.module.scss';
import restLogo from '../../assets/rest-api-logo.png';
import graphQLLogo from '../../assets/graphQL-logo.png';
import rssLogo from '../../assets/svg/rs-school.svg';
import Image from 'next/image';
import { logInWithEmailAndPassword } from '@/authService';
import { customUserName } from '@/utils/customNameUser';
import Link from 'next/link';
import { TeamList } from '@/components/TeamList/TeamList';

const courseDescription = [
  '1. Deep learning of React',
  '2. Project-oriented approach',
  '3. Mentoring and code review',
  '4. Support for modern tools',
  '5. Community and Career Opportunities',
];

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
        <h2 className={welcomePageStyles['section-project__title']}>Our Project</h2>
        <div className={welcomePageStyles['section-project__description']}>
          <p
            className={welcomePageStyles['section-project__subtitle']}
          >{`Our tool offers a streamlined interface that simplifies your workflow:`}</p>
          <ul className={welcomePageStyles['section-project__list']}>
            <li>{`Test endpoints effortlessly.`}</li>
            <li>{`Analyze responses quickly.`}</li>
            <li>{`Manage API requests with ease.`}</li>
            <li>{`Switch seamlessly between REST and GraphQL.`}</li>
            <li>{`Customize your requests and view responses in real-time.`}</li>
          </ul>
          <p>{`It's a one-stop solution for API development and testing, designed to make your work faster, easier, and more productive. Dive in and explore how our tool can transform your API interactions, making them smoother and more efficient than ever before.`}</p>
        </div>
      </section>
      <section className={welcomePageStyles['section-team']}>
        <h2 className={welcomePageStyles['section-team__title']}>Our Team</h2>
        <h3 className={welcomePageStyles['section-team__subtitle']}>Jumping Skunk</h3>
        <TeamList />
      </section>
      <section className={welcomePageStyles['section-course']}>
        <h2 className={welcomePageStyles['section-course__title']}>Our Learning Path</h2>
        <h3
          className={welcomePageStyles['section-course__subtitle']}
        >{`RS School's React course is an advanced educational program aimed at developers who want to master React and become professional front-end developers. `}</h3>
        <div className={welcomePageStyles['section-course__description-container']}>
          <div className={welcomePageStyles['section-course__description']}>
            <div className={welcomePageStyles['section-course__description-title']}>Main features of the course:</div>
            {courseDescription.map((line, index) => (
              <div key={index}>
                {line}
                <br />
              </div>
            ))}
            <div
              className={welcomePageStyles['section-course__description-text']}
            >{`RS School's React course is a great opportunity for developers to deepen their knowledge and skills by creating modern web applications using one of the most in-demand tools on the market.`}</div>
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
