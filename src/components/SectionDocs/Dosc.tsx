'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Queries from './SubsectionsDocs/Queries';
import docsStyles from './DocsStyles.module.scss';
import Mutations from './SubsectionsDocs/Mutations';
import Subscriptions from './SubsectionsDocs/Subscriptions';
import Loading from '@/app/loading';
import { SpeedDialIcon } from '@mui/material';
import { setOpenDocs } from '@/features/graphiql/docs.slice';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Docs() {
  const { schema, isOpen, textError } = useAppSelector((state) => state.docs);
  const dispatch = useAppDispatch();
  const t = useTranslations('Docs');

  const onCloseDocs = () => {
    dispatch(setOpenDocs(!isOpen));
  };

  useEffect(() => {
    if (textError) {
      dispatch(setOpenDocs(false));
    }
  }, [dispatch, textError]);

  return (
    <div className={`${docsStyles['docs-section']} ${isOpen ? docsStyles['open-docs'] : ''}`}>
      <div>
        <div className={docsStyles['docs-section__header']}>
          <h2 className={docsStyles['docs-section__title']}>{t('docsTitle')}</h2>
          <button className={docsStyles['docs-section__button-close']} onClick={onCloseDocs}>
            <SpeedDialIcon />
          </button>
        </div>
        {schema ? (
          <div>
            <Queries schema={schema} t={t} />
            <Mutations schema={schema} t={t} />
            <Subscriptions schema={schema} t={t} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
