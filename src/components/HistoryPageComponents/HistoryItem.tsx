import { GraphqlRequest, RESTFulState } from '@/types/types';
import historyStyles from '../../app/[locale]/history/historyPageStyles.module.scss';

interface HistoryItemProps {
  request: GraphqlRequest | RESTFulState;
  handleRequestClick: (request: GraphqlRequest | RESTFulState) => void;
  t: (arg0: string) => string;
}

export default function HistoryItem({ request, handleRequestClick, t }: HistoryItemProps) {
  const isREST = (req: GraphqlRequest | RESTFulState): req is RESTFulState => 'method' in req;

  return (
    <>
      <div className={historyStyles['history-item__info-container']}>
        <div>
          <strong>{t('HistoryTypeTitle')}</strong> {isREST(request) ? 'RESTfull' : 'GraphQL'}
        </div>
        {isREST(request) && (
          <div>
            <strong>{t('HistoryMethodTitle')}</strong> {request.method}
          </div>
        )}
        <div>
          <strong>{t('HistoryUrlTitle')}</strong>
          <button className={historyStyles['history-item__button']} onClick={() => handleRequestClick(request)}>
            {request.url}
          </button>
        </div>
      </div>
      <div>
        <strong>{t('HistoryDateTitle')}</strong> {new Date(request.date).toLocaleString()}
      </div>
    </>
  );
}
