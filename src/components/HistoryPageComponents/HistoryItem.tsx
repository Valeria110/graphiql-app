import { GraphqlRequest, RESTFulState } from '@/types/types';
import historyStyles from '../../app/[locale]/history/historyPageStyles.module.scss';

interface HistoryItemProps {
  request: GraphqlRequest | RESTFulState;
  handleRequestClick: (request: GraphqlRequest | RESTFulState) => void;
}

export default function HistoryItem({ request, handleRequestClick }: HistoryItemProps) {
  const isREST = (req: GraphqlRequest | RESTFulState): req is RESTFulState => 'method' in req;

  return (
    <>
      <div className={historyStyles['history-item__info-container']}>
        <div>
          <strong>Type: </strong> {isREST(request) ? 'RESTfull' : 'GraphQL'}
        </div>
        {isREST(request) && (
          <div>
            <strong>Method: </strong> {request.method}
          </div>
        )}
        <div>
          <strong>URL: </strong>
          <button className={historyStyles['history-item__button']} onClick={() => handleRequestClick(request)}>
            {request.url}
          </button>
        </div>
      </div>
      <div>
        <strong>Date: </strong> {new Date(request.date).toLocaleString()}
      </div>
    </>
  );
}
