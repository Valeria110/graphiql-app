import { describe, expect, it, vi } from 'vitest';
import { fetchGraphQLData, getGraphqlSchema } from './graphqlRequests';
import { getIntrospectionQuery, IntrospectionNamedTypeRef, IntrospectionObjectType } from 'graphql';

global.fetch = vi.fn();

describe('fetchGraphQLData', () => {
  it('should return "Please, enter a url to make a request" if a url is not provided', async () => {
    const result = await fetchGraphQLData('', 'query');
    expect(result).toBe('Please, enter a url to make a request');
  });

  it('should handle network error', async () => {
    const mockFetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
    global.fetch = mockFetch;

    const result = await fetchGraphQLData('http://example.com', 'query');
    expect(result).toBe('Network error');
  });

  it('should return formatted response with data and errors', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      status: 200,
      json: vi.fn().mockResolvedValue({
        data: {
          name: 'Ricky',
          gender: 'male',
        },
        errors: [],
      }),
    });

    global.fetch = mockFetch;

    const result = await fetchGraphQLData('http://example.com', 'query');

    expect(result).toEqual(
      JSON.stringify(
        {
          data: {
            name: 'Ricky',
            gender: 'male',
          },
          errors: [],
          status: 200,
        },
        null,
        2,
      ),
    );
  });

  it('should handle variables in request', async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      status: 200,
      json: vi.fn().mockResolvedValue({
        data: {
          name: 'Ricky',
          gender: 'male',
        },
        errors: [],
      }),
    });

    global.fetch = mockFetch;

    const variables = JSON.stringify({ name: 'John Doe' });
    const result = await fetchGraphQLData('http://example.com', 'query', null, variables);

    expect(mockFetch).toHaveBeenCalledWith('http://example.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query: 'query', variables: { name: 'John Doe' } }),
    });

    expect(result).toEqual(
      JSON.stringify(
        {
          data: {
            name: 'Ricky',
            gender: 'male',
          },
          errors: [],
          status: 200,
        },
        null,
        2,
      ),
    );
  });
});

describe('getGraphqlSchema', () => {
  it('should fetch schema from GraphQL endpoint', async () => {
    const mockSchema = {
      queryType: {
        kind: 'OBJECT',
        name: 'Query',
      } as IntrospectionNamedTypeRef<IntrospectionObjectType>,
      mutationType: undefined,
      subscriptionType: undefined,
      types: [],
      directives: [],
    };

    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({
        data: {
          __schema: mockSchema,
        },
      }),
    });

    global.fetch = mockFetch;

    const schema = await getGraphqlSchema('http://example.com');

    expect(mockFetch).toHaveBeenCalledWith('http://example.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    expect(schema).toBeDefined();
  });

  it('should return undefined if fetching schema fails', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = mockFetch;

    const schema = await getGraphqlSchema('http://example.com');
    expect(schema).toBeUndefined();
  });
});
