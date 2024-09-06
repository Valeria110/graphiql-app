import { describe, expect, it } from 'vitest';
import { makeStore } from './store';

const graphiqlEditorInitialState = {
  query: `query {
  character(id: 1) {
    id
    name
    status
  }
}`,
  headers: null,
  variables: null,
  response: '',
  urlEndpoint: 'https://rickandmortyapi.com/graphql',
  sdlUrl: 'https://rickandmortyapi.com/graphql?sdl',
};

const docsInitialState = {
  schema: null,
  isOpen: false,
  textError: '',
};

const restfulInitialState = {
  method: 'GET',
  url: '',
  variableTable: [],
  bodyType: 'json',
  headers: [],
  bodyText: '',
  urlInner: 'GET',
  response: undefined,
  isInitialized: false,
  date: '',
};

describe('Redux Store', () => {
  it('should properly make a redux store', () => {
    const store = makeStore();

    expect(store).toBeDefined();
    expect(store.getState()).toEqual({
      graphiqlEditor: graphiqlEditorInitialState,
      docs: docsInitialState,
      RESTFul: restfulInitialState,
    });
  });

  it('should have the right types', () => {
    const store = makeStore();

    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
  });
});
