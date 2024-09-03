'use client';
import { setCurrentRequest } from '@/features/history/history.slice';
import { useAppDispatch } from '@/hooks/storeHooks';
import { GraphqlRequest, PagesRoutes, RESTFulState } from '@/types/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import historyStyles from './historyPageStyles.module.scss';
import { getArrayFromLocalStorage } from '@/utils/utils';

const KEY_RESTFUL = 'RESTFul-store';
const KEY_GRAPHQL = 'graphqlRequests';

export default function HistoryPage() {
  const [requests, setRequests] = useState<(GraphqlRequest | RESTFulState)[]>([]);
  const localActive = useLocale();
  const dispatch = useAppDispatch();
  const t = useTranslations('WelcomePage');

  useEffect(() => {
    const restRequests = getArrayFromLocalStorage(KEY_RESTFUL);
    const graphqlRequests = getArrayFromLocalStorage(KEY_GRAPHQL);

    const combinedRequests = [...restRequests, ...graphqlRequests];

    combinedRequests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setRequests(combinedRequests);
  }, []);

  const handleRequestClick = (request: GraphqlRequest | RESTFulState) => {
    dispatch(setCurrentRequest(request));
  };

  return (
    <div className={historyStyles['history-page']}>
      <h2>History Requests</h2>
      {}
      {requests.length > 0 ? (
        <ul>
          {requests.map((request, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <div>
                <strong>Запрос:</strong>
              </div>
              <button onClick={() => handleRequestClick(request)}>{request.url}</button>
              <div>{request.date}</div>
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
