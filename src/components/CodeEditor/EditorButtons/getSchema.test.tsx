import { getGraphqlSchema } from '@/api/graphqlRequests';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EditorButtons from './EditorButtons';
import { setError, setNewSchema, setOpenDocs } from '@/features/graphiql/docs.slice';
import { IntrospectionQuery } from 'graphql';

vi.mock('@/hooks/storeHooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('@/api/graphqlRequests', () => ({
  getGraphqlSchema: vi.fn(),
}));

const mockDispatch = vi.fn();

const mockSchema: IntrospectionQuery = {
  __schema: {
    queryType: { name: 'Query', kind: 'OBJECT' },
    mutationType: null,
    subscriptionType: null,
    types: [],
    directives: [],
  },
};

describe('EditorButtons Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it('fetches and dispatches schema successfully', async () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      urlEndpoint: 'http://example.com/graphql',
      sdlUrl: 'http://example.com/sdl',
      headers: {},
      variables: {},
    });
    (getGraphqlSchema as Mock).mockResolvedValue(mockSchema);

    render(<EditorButtons query="" setQuery={() => {}} />);

    fireEvent.click(screen.getByTestId('schema-btn'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setNewSchema(mockSchema));
      expect(mockDispatch).toHaveBeenCalledWith(setOpenDocs(true));
      expect(mockDispatch).toHaveBeenCalledWith(setError(''));
    });
  });

  it('dispatches error when schema fetch fails', async () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      urlEndpoint: 'http://example.com/graphql',
      sdlUrl: 'http://example.com/sdl',
      headers: {},
      variables: {},
    });
    (getGraphqlSchema as Mock).mockRejectedValue(new Error('Fetch failed'));

    render(<EditorButtons query="" setQuery={() => {}} />);

    fireEvent.click(screen.getByTestId('schema-btn'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching schema: Fetch failed'));
    });
  });
});
