'use client';
import { setCurrentRequest } from '@/features/history/history.slice';
import { useAppDispatch } from '@/hooks/storeHooks';
import { GraphqlRequest, PagesRoutes } from '@/types/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import historyStyles from './historyPageStyles.module.scss';

export default function HistoryPage() {
  const [graphqlRequests, setGraphqlRequests] = useState<GraphqlRequest[]>([]);
  const localActive = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations('WelcomePage');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRequests = localStorage.getItem('graphqlRequests');
      if (storedRequests) {
        try {
          const parsedRequests = JSON.parse(storedRequests);
          const sortedRequests = parsedRequests.sort((a: GraphqlRequest, b: GraphqlRequest) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          setGraphqlRequests(sortedRequests);
        } catch (error) {
          console.error('Failed to parse requests:', error);
        }
      }
    }
  }, []);

  const handleRequestClick = (request: GraphqlRequest) => {
    dispatch(setCurrentRequest(request));
    router.push(`/${localActive}/${PagesRoutes.Graphql}`);
  };

  return (
    <div className={historyStyles['history-page']}>
      <h2>History Requests</h2>
      {}
      {graphqlRequests.length > 0 ? (
        <ul>
          {graphqlRequests.map((request, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <div>
                <strong>Запрос:</strong>
              </div>
              <a href="#" onClick={() => handleRequestClick(request)}>
                {request.url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className={historyStyles['user-message']}>
          <p
            className={historyStyles['user-message__title']}
          >{`You haven't executed any requests. It's empty here. Try:`}</p>
          <div className={historyStyles['user-message__buttons-container']}>
            <Link href={'/'} className={historyStyles['user-message__button-navigate']}>
              {t('sectionWelcomeBtnRestClient')}
            </Link>
            <Link
              href={`/${localActive}/${PagesRoutes.Graphql}`}
              className={historyStyles['user-message__button-navigate']}
            >
              {t('sectionWelcomeBtnGraphiQLClient')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
