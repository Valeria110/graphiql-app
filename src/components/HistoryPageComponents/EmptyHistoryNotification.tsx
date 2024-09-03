import Link from 'next/link';
import historyStyles from '../../app/[locale]/history/historyPageStyles.module.scss';
import { useLocale } from 'next-intl';
import { PagesRoutes } from '@/types/types';

export default function EmptyHistoryNotification() {
  const localActive = useLocale();

  return (
    <div className={historyStyles['user-message']}>
      <p
        className={historyStyles['user-message__title']}
      >{`You haven't executed any requests. It's empty here. Try:`}</p>
      <div className={historyStyles['user-message__buttons-container']}>
        <Link
          href={`/${localActive}/${PagesRoutes.RESTFul}`}
          className={historyStyles['user-message__button-navigate']}
        >
          rest
        </Link>
        <Link
          href={`/${localActive}/${PagesRoutes.Graphql}`}
          className={historyStyles['user-message__button-navigate']}
        >
          graphql
        </Link>
      </div>
    </div>
  );
}
