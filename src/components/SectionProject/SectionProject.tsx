import { splitString } from '@/utils/splitString';
import sectionProjectStyles from '../../app/[locale]/welcomePageStyles.module.scss';

interface SectionProjectProps {
  t: (arg0: string) => string;
}

export default function SectionProject({ t }: SectionProjectProps) {
  return (
    <section className={sectionProjectStyles['section-project']}>
      <h2 className={sectionProjectStyles['section-project__title']}>{t('sectionProjectTitle')}</h2>
      <div className={sectionProjectStyles['section-project__description']}>
        <p className={sectionProjectStyles['section-project__subtitle']}>{t('sectionProjectSubtitle')}</p>
        <ul className={sectionProjectStyles['section-project__list']}>
          {splitString(t('sectionProjectList')).map((line, index: number) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <p>{t('sectionProjecDescriptionText')}</p>
      </div>
    </section>
  );
}
