'use client';
import { GraphqlRequest, RESTFulState } from '@/types/types';
import { useState, useEffect, useMemo } from 'react';
import historyStyles from './historyPageStyles.module.scss';
import { getArrayFromLocalStorage } from '@/utils/utils';
import EmptyHistoryNotification from '@/components/HistoryPageComponents/EmptyHistoryNotification';
import HistoryItem from '@/components/HistoryPageComponents/HistoryItem';
import { Pagination, Stack, Typography } from '@mui/material';
import { useRedirectToRequest } from '@/hooks/historyHook';
import { useTranslations } from 'next-intl';

const KEY_RESTFUL = 'RESTFul-store';
const KEY_GRAPHQL = 'graphqlRequests';
const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
  const [requests, setRequests] = useState<(GraphqlRequest | RESTFulState)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const redirectToRequest = useRedirectToRequest();
  const t = useTranslations('HistoryPage');

  useEffect(() => {
    const restRequests = getArrayFromLocalStorage(KEY_RESTFUL);
    const graphqlRequests = getArrayFromLocalStorage(KEY_GRAPHQL);

    const combinedRequests = [...restRequests, ...graphqlRequests].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setRequests(combinedRequests);
  }, []);

  const handleRequestClick = (request: GraphqlRequest | RESTFulState) => {
    redirectToRequest(request);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const currentRequests = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return requests.slice(indexOfFirstItem, indexOfLastItem);
  }, [requests, currentPage]);

  return (
    <div className={historyStyles['history-page']}>
      <h2>{t('HistoryPageTitle')}</h2>
      {requests.length === 0 && <EmptyHistoryNotification t={t} />}
      {requests.length > 0 && (
        <div className={historyStyles['history-page__requests-container']}>
          <Typography>
            {t('HistoryPaginationTitle')} {currentPage}
          </Typography>
          {currentRequests.map((request, index) => (
            <div key={index} className={historyStyles['history-item']}>
              <HistoryItem request={request} handleRequestClick={handleRequestClick} t={t} />
            </div>
          ))}

          <Stack spacing={2} className={historyStyles['pagination-container']}>
            <Pagination
              count={Math.ceil(requests.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      )}
    </div>
  );
}