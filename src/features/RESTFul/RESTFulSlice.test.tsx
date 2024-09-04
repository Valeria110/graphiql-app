import { describe, expect, it } from 'vitest';
import RESTFulSliceReducer, {
  initialState,
  setMethod,
  setUrl,
  setBodyText,
  setVariableTable,
  setResponse,
  setObj,
  setBodyType,
  setUrlAndUpdateURLInner,
} from './RESTFulSlice';
import { functionConvertObjToShortURL } from '@/utils/utilsRESTful';

describe('RESTFulSliceReducer', () => {
  it('should return the correct initial state', () => {
    const state = RESTFulSliceReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should set a method correctly', () => {
    const state = RESTFulSliceReducer(initialState, setMethod('GET'));
    expect(state).toEqual({ ...initialState, method: 'GET' });
  });

  it('should set a url correctly', () => {
    const state = RESTFulSliceReducer(initialState, setUrl('some url'));
    expect(state).toEqual({ ...initialState, url: 'some url' });
  });

  it('should set a body text correctly', () => {
    const state = RESTFulSliceReducer(initialState, setBodyText('some body text'));
    expect(state).toEqual({
      ...initialState,
      bodyText: 'some body text',
      urlInner: functionConvertObjToShortURL(state),
    });
  });

  it('should set a variable table text correctly', () => {
    const state = RESTFulSliceReducer(initialState, setVariableTable([{ variable: 'id', value: '1' }]));
    expect(state).toEqual({ ...initialState, variableTable: [{ variable: 'id', value: '1' }] });
  });

  it('should set a response text correctly', () => {
    const response = { code: 200, timeMs: 12, responseText: 'response' };
    const state = RESTFulSliceReducer(initialState, setResponse(response));
    expect(state).toEqual({ ...initialState, response: response });
  });

  it('should set a body type correctly', () => {
    const state = RESTFulSliceReducer(initialState, setBodyType('text'));
    expect(state).toEqual({ ...initialState, bodyType: 'text' });
  });

  it('should set a url correctly', () => {
    const state = RESTFulSliceReducer(initialState, setUrlAndUpdateURLInner('some url'));
    expect(state).toEqual({ ...initialState, url: 'some url', urlInner: functionConvertObjToShortURL(state) });
  });

  it('should set an object correctly', () => {
    const newObj = { ...initialState, url: 'some url', bodyText: 'body text' };
    const state = RESTFulSliceReducer(initialState, setObj(newObj));
    expect(state).toEqual(newObj);
  });
});
