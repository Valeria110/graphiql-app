'use client';
import { GraphqlRequest, RESTFulState } from '@/types/types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import historyStyles from './historyPageStyles.module.scss';
import EmptyHistoryNotification from '@/components/HistoryPageComponents/EmptyHistoryNotification';
import HistoryItem from '@/components/HistoryPageComponents/HistoryItem';
import { Button, ButtonGroup, Pagination, Stack, Typography } from '@mui/material';
import { useRedirectToRequest } from '@/hooks/historyHook';
import { useTranslations } from 'next-intl';
import Loading from '@/app/loading';
import { getSortedRequests, KEY_RESTFUL, KEY_GRAPHQL } from '@/utils/historyUtils';
import { useUser } from '@/hooks/authHook';
import LoginRequired from '@/components/LoginRequired/LoginRequired';

const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
  const [requests, setRequests] = useState<(GraphqlRequest | RESTFulState)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const user = useUser();
  const redirectToRequest = useRedirectToRequest();
  const t = useTranslations('HistoryPage');

  const loadRequests = useCallback(() => {
    try {
      const combinedRequests = getSortedRequests(sortOrder);
      setIsEmpty(combinedRequests.length === 0);
      setRequests(combinedRequests);
    } catch (err) {
      setError(t('ErrorLC'));
    } finally {
      setIsLoading(false);
    }
  }, [sortOrder]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleRequestClick = useCallback(
    (request: GraphqlRequest | RESTFulState) => {
      redirectToRequest(request);
    },
    [redirectToRequest],
  );

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(KEY_RESTFUL);
    localStorage.removeItem(KEY_GRAPHQL);
    setRequests([]);
    setIsEmpty(true);
    setCurrentPage(1);
  }, []);

  const currentRequests = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return requests.slice(indexOfFirstItem, indexOfLastItem);
  }, [requests, currentPage]);

  if (!user) {
    return <LoginRequired serviceName="History" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (isEmpty) {
    return <EmptyHistoryNotification t={t} />;
  }

  return (
    <div className={historyStyles['history-page']}>
      <h2>{t('HistoryPageTitle')}</h2>
      <div className={historyStyles['history-page__requests-container']}>
        <Typography>
          {t('HistoryPaginationTitle')} {currentPage}
        </Typography>

        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={clearHistory}>{t('HistoryBtnClear')}</Button>
          <Button onClick={toggleSortOrder}>{sortOrder === 'asc' ? t('HistoryBtnDesc') : t('HistoryBtnAsc')}</Button>
        </ButtonGroup>

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
    </div>
  );
}
