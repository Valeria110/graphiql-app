import { GraphqlRequest, PagesRoutes, RESTFulState } from '@/types/types';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from './storeHooks';
import { restoreAllFieldsGraphiql } from '@/features/graphiql/graphiqlEditorSlice';
import { restoreAllFieldsRest } from '@/features/RESTFul/RESTFulSlice';

export function useRedirectToRequest() {
  const router = useRouter();
  const localActive = useLocale();
  const dispatch = useAppDispatch();

  const redirectToRequest = (request: GraphqlRequest | RESTFulState) => {
    if ('body' in request) {
      router.push(`/${localActive}/${PagesRoutes.Graphql}`);
      dispatch(
        restoreAllFieldsGraphiql({
          query: request.body,
          headers: request.headers || null,
          variables: request.variables || null,
          response: '',
          urlEndpoint: request.url,
          sdlUrl: request.sdlUrl || '',
        }),
      );
    } else if ('method' in request) {
      router.push(`/${localActive}/${PagesRoutes.RESTFul}`);

      dispatch(
        restoreAllFieldsRest({
          method: request.method,
          url: request.url,
          variableTable: request.variableTable || [],
          bodyType: request.bodyType,
          headers: request.headers,
          bodyText: request.bodyText,
          urlInner: request.urlInner,
          response: request.response,
          isInitialized: request.isInitialized,
          date: request.date,
        }),
      );
    } else {
      console.error('Unknown request type:', request);
    }
  };

  return redirectToRequest;
}
