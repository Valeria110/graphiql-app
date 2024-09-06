import { describe, expect, it } from 'vitest';
import docsSLiceReducer, { initialState, setError, setNewSchema, setOpenDocs } from './docs.slice';
import { IntrospectionNamedTypeRef, IntrospectionObjectType, IntrospectionQuery } from 'graphql';

describe('docsSLiceReducer', () => {
  it('should return the correct initial state', () => {
    const state = docsSLiceReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should set an error correctly', () => {
    const state = docsSLiceReducer(initialState, setError('error'));
    expect(state).toEqual({ ...initialState, textError: 'error' });
  });

  it('should set isOpenDocs correctly', () => {
    const state = docsSLiceReducer(initialState, setOpenDocs(true));
    expect(state).toEqual({ ...initialState, isOpen: true });
  });

  it('should set a new schema correctly', () => {
    const mockSchema: IntrospectionQuery = {
      __schema: {
        queryType: {
          kind: 'OBJECT',
          name: 'Query',
        } as IntrospectionNamedTypeRef<IntrospectionObjectType>,
        mutationType: undefined,
        subscriptionType: undefined,
        types: [],
        directives: [],
      },
    };

    const state = docsSLiceReducer(initialState, setNewSchema(mockSchema));
    expect(state.schema).toEqual(mockSchema);
  });
});
