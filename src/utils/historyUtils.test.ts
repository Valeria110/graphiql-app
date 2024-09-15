import { beforeEach, describe, expect, it } from 'vitest';
import { KEY_GRAPHQL, KEY_RESTFUL, getArrayFromLocalStorage, getSortedRequests } from './historyUtils';

describe('getArrayFromLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns an array from localStorage', () => {
    const mockData = [{ date: '2024-01-01T00:00:00Z' }, { date: '2024-01-02T00:00:00Z' }];
    localStorage.setItem(KEY_RESTFUL, JSON.stringify(mockData));

    const result = getArrayFromLocalStorage(KEY_RESTFUL);
    expect(result).toEqual(mockData);
  });

  it('returns an empty array if localStorage item is not found', () => {
    const result = getArrayFromLocalStorage(KEY_RESTFUL);
    expect(result).toEqual([]);
  });

  it('returns an empty array if localStorage item is not valid JSON', () => {
    localStorage.setItem(KEY_RESTFUL, 'invalid json');

    const result = getArrayFromLocalStorage(KEY_RESTFUL);
    expect(result).toEqual([]);
  });
});

describe('getSortedRequests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns sorted requests in asc order', () => {
    const restRequests = [{ date: '2024-01-02T00:00:00Z' }, { date: '2024-01-01T00:00:00Z' }];
    const graphqlRequests = [{ date: '2024-01-03T00:00:00Z' }];
    localStorage.setItem(KEY_RESTFUL, JSON.stringify(restRequests));
    localStorage.setItem(KEY_GRAPHQL, JSON.stringify(graphqlRequests));

    const result = getSortedRequests('asc');
    expect(result).toEqual([
      { date: '2024-01-01T00:00:00Z' },
      { date: '2024-01-02T00:00:00Z' },
      { date: '2024-01-03T00:00:00Z' },
    ]);
  });

  it('returns sorted requests in desc order', () => {
    const restRequests = [{ date: '2024-01-01T00:00:00Z' }, { date: '2024-01-02T00:00:00Z' }];
    const graphqlRequests = [{ date: '2024-01-03T00:00:00Z' }];
    localStorage.setItem(KEY_RESTFUL, JSON.stringify(restRequests));
    localStorage.setItem(KEY_GRAPHQL, JSON.stringify(graphqlRequests));

    const result = getSortedRequests('desc');
    expect(result).toEqual([
      { date: '2024-01-03T00:00:00Z' },
      { date: '2024-01-02T00:00:00Z' },
      { date: '2024-01-01T00:00:00Z' },
    ]);
  });
});
