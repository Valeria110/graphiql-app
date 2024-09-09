import { restoreAllFieldsGraphiql } from '@/features/graphiql/graphiqlEditorSlice';
import { restoreAllFieldsRest } from '@/features/RESTFul/RESTFulSlice';
import { renderHook } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { act } from 'react';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { useRedirectToRequest } from './historyHook';
import { useAppDispatch } from './storeHooks';
import { BodyType, HeadersREST, HttpMethod, ResponseObj } from '@/types/types';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
}));

vi.mock('./storeHooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('@/features/graphiql/graphiqlEditorSlice', () => ({
  restoreAllFieldsGraphiql: vi.fn(),
}));

vi.mock('@/features/RESTFul/RESTFulSlice', () => ({
  restoreAllFieldsRest: vi.fn(),
}));

describe('useRedirectToRequest', () => {
  const mockPush = vi.fn();
  const mockDispatch = vi.fn();
  const mockLocale = 'en';

  const mockRouter = {
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  };

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useLocale).mockReturnValue(mockLocale);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to GraphQL page and dispatch GraphQL restore action', () => {
    const { result } = renderHook(() => useRedirectToRequest());

    const graphqlRequest = {
      body: 'query { test }',
      headers: { Authorization: 'Bearer token' },
      variables: null,
      url: 'http://example.com/graphql',
      sdlUrl: 'http://example.com/sdl',
      date: '',
    };

    act(() => {
      result.current(graphqlRequest);
    });

    expect(mockPush).toHaveBeenCalledWith(`/${mockLocale}/graphql`);
    expect(mockDispatch).toHaveBeenCalledWith(
      restoreAllFieldsGraphiql({
        query: graphqlRequest.body,
        headers: graphqlRequest.headers,
        variables: graphqlRequest.variables,
        response: '',
        urlEndpoint: graphqlRequest.url,
        sdlUrl: graphqlRequest.sdlUrl,
      }),
    );
  });

  it('should redirect to RESTFul page and dispatch RESTFul restore action', () => {
    const { result } = renderHook(() => useRedirectToRequest());

    const restRequest = {
      method: 'POST' as HttpMethod,
      url: 'http://example.com/api',
      variableTable: [],
      bodyType: 'json' as BodyType,
      headers: { 'Content-Type': 'application/json' } as unknown as HeadersREST,
      bodyText: '{"key":"value"}',
      urlInner: '/api/test',
      response: 'Success' as unknown as ResponseObj,
      isInitialized: true,
      date: '2024-09-08',
    };

    act(() => {
      result.current(restRequest);
    });

    expect(mockPush).toHaveBeenCalledWith(`/${mockLocale}/RESTful`);
    expect(mockDispatch).toHaveBeenCalledWith(
      restoreAllFieldsRest({
        method: restRequest.method,
        url: restRequest.url,
        variableTable: restRequest.variableTable,
        bodyType: restRequest.bodyType,
        headers: restRequest.headers,
        bodyText: restRequest.bodyText,
        urlInner: restRequest.urlInner,
        response: restRequest.response,
        isInitialized: restRequest.isInitialized,
        date: restRequest.date,
      }),
    );
  });
});
