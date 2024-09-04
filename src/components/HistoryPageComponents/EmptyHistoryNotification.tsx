import Link from 'next/link';
import historyStyles from '../../app/[locale]/history/historyPageStyles.module.scss';
import { useLocale } from 'next-intl';
import { PagesRoutes } from '@/types/types';

interface EmptyHistoryNotificationProps {
  t: (arg0: string) => string;
}

export default function EmptyHistoryNotification({ t }: EmptyHistoryNotificationProps) {
  const localActive = useLocale();

  return (
    <div className={historyStyles['user-message']}>
      <p className={historyStyles['user-message__title']}>{t('EmptyHistory')}</p>
      <div className={historyStyles['user-message__buttons-container']}>
        <Link
          href={`/${localActive}/${PagesRoutes.RESTFul}`}
          className={historyStyles['user-message__button-navigate']}
        >
          {t('HistoryBtnRest')}
        </Link>
        <Link
          href={`/${localActive}/${PagesRoutes.Graphql}`}
          className={historyStyles['user-message__button-navigate']}
        >
          {t('HistoryBtnGraphiQL')}
        </Link>
      </div>
    </div>
  );
}
