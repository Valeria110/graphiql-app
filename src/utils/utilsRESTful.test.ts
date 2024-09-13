import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getHttpMethods, isJSON, convertSlugToObj, addObjectToLocalStorage } from './utilsRESTful';
import { RESTFulState } from '@/types/types';

describe('convertSlugToObj', () => {
  beforeEach(() => {
    vi.mock('./utilsRESTful', async () => {
      const mockMiniObj = {
        url: 'https://example.com',
        bodyText: '{"key":"value"}',
        variableTable: [],
      };

      const actual = await vi.importActual<typeof import('./utilsRESTful')>('./utilsRESTful');
      return {
        ...actual,
        decodeBase64UrlToObject: vi.fn(() => mockMiniObj),
        functionConvertObjToShortURL: vi.fn(() => 'GET'),
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return default RESTFulState with method GET when slug is empty', () => {
    const result = convertSlugToObj([]);
    expect(result.method).toBe('GET');
    expect(result.headers).toEqual([]);
    expect(result.url).toBe('');
    expect(result.isInitialized).toBe(true);
  });

  it('should correctly set HTTP method when first part of slug is valid', () => {
    const result = convertSlugToObj(['POST']);
    expect(result.method).toBe('POST');
  });

  it('should return valid urlInner when functionConvertObjToShortURL is called', () => {
    const result = convertSlugToObj(['GET']);
    expect(result.urlInner).toBe('GET');
  });

  it('should handle errors during miniObj decoding gracefully', () => {
    const result = convertSlugToObj(['GET', 'invalidSlug']);
    expect(result.url).toBe('');
    expect(result.headers).toEqual([]);
  });
});

describe('getHttpMethods', () => {
  it('should return an array of HTTP methods', () => {
    const methods = getHttpMethods();
    expect(methods).toEqual(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']);
  });

  it('should return an array with 7 methods', () => {
    const methods = getHttpMethods();
    expect(methods.length).toBe(7);
  });
});

describe('isJSON', () => {
  it('should return true for valid JSON string', () => {
    const validJSON = '{"key": "value"}';
    expect(isJSON(validJSON)).toBe(true);
  });

  it('should return false for invalid JSON string', () => {
    const invalidJSON = '{key: value}';
    expect(isJSON(invalidJSON)).toBe(false);
  });

  it('should return false for non-JSON string', () => {
    const nonJSON = 'This is not JSON';
    expect(isJSON(nonJSON)).toBe(false);
  });
});

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

describe('addObjectToLocalStorage', () => {
  beforeEach(() => {
    (globalThis as unknown as { localStorage: Storage }).localStorage = localStorageMock as Storage;
    localStorageMock.clear();
  });

  it('should add a new object to an empty localStorage', () => {
    const obj: RESTFulState = {
      method: 'GET',
      url: 'https://example.com',
      variableTable: [],
      headers: [],
      bodyText: '{"key":"value"}',
      bodyType: 'json',
      urlInner: 'example',
      isInitialized: true,
      date: new Date().toISOString(),
    };

    addObjectToLocalStorage(obj);

    const storedData = localStorage.getItem('RESTFul-store');
    expect(storedData).toBe(JSON.stringify([obj]));
  });

  it('should add a new object to existing data in localStorage', () => {
    const existingData: RESTFulState[] = [
      {
        method: 'POST',
        url: 'https://example.com/old',
        variableTable: [],
        headers: [],
        bodyText: '{"oldKey":"oldValue"}',
        bodyType: 'json',
        urlInner: 'oldExample',
        isInitialized: false,
        date: new Date().toISOString(),
      },
    ];

    localStorage.setItem('RESTFul-store', JSON.stringify(existingData));

    const newObj: RESTFulState = {
      method: 'PUT',
      url: 'https://example.com/new',
      variableTable: [],
      headers: [],
      bodyText: '{"newKey":"newValue"}',
      bodyType: 'json',
      urlInner: 'newExample',
      isInitialized: true,
      date: new Date().toISOString(),
    };

    addObjectToLocalStorage(newObj);

    const updatedData = [...existingData, newObj];
    const storedData = localStorage.getItem('RESTFul-store');
    expect(storedData).toBe(JSON.stringify(updatedData));
  });

  it('should handle errors during JSON parsing or stringifying gracefully', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('invalid JSON');
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('Failed to stringify');
    });

    const obj: RESTFulState = {
      method: 'DELETE',
      url: 'https://example.com/error',
      variableTable: [],
      headers: [],
      bodyText: '{"errorKey":"errorValue"}',
      bodyType: 'json',
      urlInner: 'errorExample',
      isInitialized: false,
      date: new Date().toISOString(),
    };

    addObjectToLocalStorage(obj);

    expect(localStorage.getItem('RESTFul-store')).toBe('invalid JSON');
  });
});
