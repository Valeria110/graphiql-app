import { PagesRoutes } from '@/types/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './loginRequiredStyles.module.scss';

interface LoginRequiredProps {
  serviceName: string;
}

export default function LoginRequired({ serviceName }: LoginRequiredProps) {
  const localActive = useLocale();
  const t = useTranslations('LoginRequired');

  let serviceText = '';
  switch (serviceName) {
    case 'GraphQL':
      serviceText = t('GraphQLText');
      break;
    case 'History':
      serviceText = t('HistoryText');
      break;
    case 'REST':
      serviceText = t('RESTText');
      break;
    default:
      serviceText = '';
      break;
  }

  return (
    <div className={styles['login-required']}>
      <h1>
        {t('InfoText')} {serviceText}
      </h1>
      <Link className={styles['login-required__button-navigate']} href={`/${localActive}/${PagesRoutes.SignIn}`}>
        {t('signInBtn')}
      </Link>
    </div>
  );
}
