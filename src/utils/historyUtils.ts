import { GraphqlRequest, RESTFulState } from '@/types/types';

export const KEY_RESTFUL = 'RESTFul-store';
export const KEY_GRAPHQL = 'graphqlRequests';

export function getArrayFromLocalStorage(key: string): RESTFulState[] | GraphqlRequest[] {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting array from Local Storage:', error);
    return [];
  }
}

export const getSortedRequests = (sortOrder: string) => {
  const restRequests = getArrayFromLocalStorage(KEY_RESTFUL);
  const graphqlRequests = getArrayFromLocalStorage(KEY_GRAPHQL);

  return [...restRequests, ...graphqlRequests].sort((a, b) =>
    sortOrder === 'asc'
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};
