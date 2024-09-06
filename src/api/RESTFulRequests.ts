'use server';

import insertVariablesInBody from '@/utils/insertVariablesInBody';
import { ResponseObj, RESTFulState } from '@/types/types';

export async function RESTFulRequests(obj: RESTFulState): Promise<ResponseObj> {
  const { variableTable, bodyText, method, headers, url } = obj;
  const replacedBody = insertVariablesInBody(variableTable, bodyText);

  try {
    const options: RequestInit = {
      method,
      headers: headers,
      body: replacedBody ? replacedBody : undefined,
    };

    const start = Date.now();
    const res = await fetch(url, options);
    const finish = Date.now();

    let responseText = '';
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        const json = await res.json();
        responseText = JSON.stringify(json, null, 2);
      } catch {
        responseText = '';
      }
    } else {
      try {
        responseText = await res.text();
      } catch {
        responseText = '';
      }
    }

    return {
      code: res.status,
      timeMs: finish - start,
      responseText: responseText,
    };
  } catch (error: unknown) {
    const errorMessage = 'An unexpected error occurred =(';
    const statusCode = 500;

    return {
      code: statusCode,
      timeMs: 0,
      responseText: errorMessage,
    };
  }
}
