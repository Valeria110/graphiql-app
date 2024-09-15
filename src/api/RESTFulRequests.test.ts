import { RESTFulState } from '@/types/types';
import { RESTFulRequests } from './RESTFulRequests';
import insertVariablesInBody from '@/utils/insertVariablesInBody';
import { vi, describe, it, expect, Mock } from 'vitest';

vi.mock('@/utils/insertVariablesInBody', () => ({
  default: vi.fn(),
}));

global.fetch = vi.fn();

describe('RESTFulRequests', () => {
  const mockObj: RESTFulState = {
    variableTable: [
      {
        variable: 'var1',
        value: 'Good news everyone!',
      },
    ],
    bodyText: 'Hello, {{var1}}!',
    bodyType: 'json',
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    url: 'https://example.com/api',
    urlInner: '',
    isInitialized: false,
    date: '',
  };

  it('should call insertVariablesInBody with correct arguments', async () => {
    await RESTFulRequests(mockObj);
    expect(insertVariablesInBody).toHaveBeenCalledWith(mockObj.variableTable, mockObj.bodyText);
  });

  it('should make a request with correct options', async () => {
    (insertVariablesInBody as Mock).mockReturnValue('Replaced body');
    (global.fetch as Mock).mockResolvedValue({
      status: 200,
      headers: {
        get: () => 'application/json',
      },
      json: () => Promise.resolve({ message: 'success' }),
    });

    const response = await RESTFulRequests(mockObj);

    expect(global.fetch).toHaveBeenCalledWith(mockObj.url, {
      method: mockObj.method,
      headers: mockObj.headers,
      body: 'Replaced body',
    });

    expect(response).toEqual({
      code: 200,
      timeMs: expect.any(Number),
      responseText: JSON.stringify({ message: 'success' }, null, 2),
    });
  });

  it('should return text response if content-type is not JSON', async () => {
    (insertVariablesInBody as Mock).mockReturnValue(null);
    (global.fetch as Mock).mockResolvedValue({
      status: 200,
      headers: {
        get: () => 'text/plain',
      },
      text: () => Promise.resolve('plain text response'),
    });

    const response = await RESTFulRequests(mockObj);

    expect(response).toEqual({
      code: 200,
      timeMs: expect.any(Number),
      responseText: 'plain text response',
    });
  });

  it('should return error response if fetch throws an error', async () => {
    (global.fetch as Mock).mockRejectedValue(new Error('Fetch error'));

    const response = await RESTFulRequests(mockObj);

    expect(response).toEqual({
      code: 500,
      timeMs: 0,
      responseText: 'An unexpected error occurred =(',
    });
  });
});
