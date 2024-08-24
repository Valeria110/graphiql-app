import Image from 'next/image';
import rssLogo from '../../assets/svg/rs-school.svg';
import sectionCourseStyles from '../../app/[locale]/welcomePageStyles.module.scss';
import { SectionsProps } from '@/interfaces';
import { splitString } from '@/utils/splitString';

export default function SectionCourse({ t }: SectionsProps) {
  return (
    <section className={sectionCourseStyles['section-course']}>
      <h2 className={sectionCourseStyles['section-course__title']}>{t('sectionCourseTitle')}</h2>
      <h3 className={sectionCourseStyles['section-course__subtitle']}>{t('sectionCourseSubtitle')}</h3>
      <div className={sectionCourseStyles['section-course__description-container']}>
        <div className={sectionCourseStyles['section-course__description']}>
          <div className={sectionCourseStyles['section-course__description-title']}>
            {t('sectionCourseDescriptionTitle')}
          </div>
          {splitString(t('sectionCourseFeature')).map((line, index: number) => (
            <div key={index}>
              {line}
              <br />
            </div>
          ))}
          <div className={sectionCourseStyles['section-course__description-text']}>
            {t('sectionCourseDescriptionText')}
          </div>
        </div>
        <a
          className={sectionCourseStyles['section-course__link']}
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={sectionCourseStyles['section-course__logo']}
            src={rssLogo}
            alt="rss-logo"
            width={200}
            height={220}
            priority
          />
        </a>
      </div>
    </section>
  );
}
