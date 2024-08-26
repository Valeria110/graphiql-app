import { SectionsProps } from '@/types/types';
import sectionTeamStyles from '../../app/[locale]/welcomePageStyles.module.scss';
import { TeamList } from '../TeamList/TeamList';

export default function SectionTeam({ t }: SectionsProps) {
  return (
    <section className={sectionTeamStyles['section-team']}>
      <h2 className={sectionTeamStyles['section-team__title']}>{t('sectionTeamTitle')}</h2>
      <h3 className={sectionTeamStyles['section-team__subtitle']}>Jumping Skunk</h3>
      <TeamList />
    </section>
  );
}
