import { describe, expect, it } from 'vitest';
import graphiqlEditorSLiceReducer, {
  initialState,
  setQuery,
  setHeaders,
  setVariables,
  setResponse,
  setUrlEndpoint,
  setSdlUrl,
} from './graphiqlEditorSlice';

describe('graphiqlEditorSLice', () => {
  it('should return the correct initial state', () => {
    const state = graphiqlEditorSLiceReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should set a query correctly', () => {
    const state = graphiqlEditorSLiceReducer(initialState, setQuery('some query'));
    expect(state).toEqual({ ...initialState, query: 'some query' });
  });

  it('should set headers correctly', () => {
    const state = graphiqlEditorSLiceReducer(initialState, setHeaders({ accept: 'application/json' }));
    expect(state).toEqual({ ...initialState, headers: { accept: 'application/json' } });
  });

  it('should set variables correctly', () => {
    const state = graphiqlEditorSLiceReducer(initialState, setVariables('some variables'));
    expect(state).toEqual({ ...initialState, variables: 'some variables' });
  });

  it('should set a response correctly', () => {
    const state = graphiqlEditorSLiceReducer(initialState, setResponse('some response'));
    expect(state).toEqual({ ...initialState, response: 'some response' });
  });

  it('should set a url endpoint correctly', () => {
    const state = graphiqlEditorSLiceReducer(initialState, setUrlEndpoint('some url endpoint'));
    expect(state).toEqual({ ...initialState, urlEndpoint: 'some url endpoint' });
  });

  it('should set a url endpoint correctly', () => {
    const state = graphiqlEditorSLiceReducer(initialState, setSdlUrl('some sdl url'));
    expect(state).toEqual({ ...initialState, sdlUrl: 'some sdl url' });
  });
});
