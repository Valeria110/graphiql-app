import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { splitString } from './splitString';
import { formatToBase64 } from './utils';
import { customUserName } from './customNameUser';
import { IRequestData, saveGraphqlRequestsHistory } from './saveGraphqlRequestsHistory';

describe('splitString', () => {
  it('should split a string with a provided or the default delimiter and return an array', () => {
    expect(splitString('1,2,3,4,5,6', ',')).toEqual(['1', '2', '3', '4', '5', '6']);
  });
});

describe('formatToBase64', () => {
  it('should convert a string to the base64 format', () => {
    const str = 'some string';
    expect(formatToBase64(str)).toBe(btoa(str));
  });
});

describe('customUserName', () => {
  it('should return a username from the provided email', () => {
    const email = 'test@gmail.com';
    expect(customUserName(email)).toBe('test');
  });
});

describe('saveGraphqlRequestsHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  const request: IRequestData = {
    body: '{ test }',
    url: '',
    sdlUrl: '',
    headers: null,
    variables: null,
    date: new Date(),
  };

  it('should save a new request when localStorage is empty', () => {
    const result = saveGraphqlRequestsHistory(request);

    expect(result).toEqual([request]);
    expect(localStorage.getItem('graphqlRequests')).toBe(JSON.stringify([request]));
  });
});
