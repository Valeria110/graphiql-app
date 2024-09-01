import { HttpMethod, RESTFulState, RESTFulStateMini, VariableRow } from '@/types/types';

export function arrayToBase64(array: VariableRow[]): string {
  const jsonString = JSON.stringify(array);
  return btoa(jsonString);
}

export function base64ToArray(base64: string): VariableRow[] {
  const jsonString = atob(base64);
  return JSON.parse(jsonString) as VariableRow[];
}

export function convertObjToSlug(obj: RESTFulState): string[] {
  const answer: string[] = [];

  const isHaveAdditionalData = obj.url.length > 0 || obj.variableTable.length > 0 || obj.bodyText.length > 0;

  answer.push(obj.method);
  if (isHaveAdditionalData) {
    const miniObj: RESTFulStateMini = {
      url: obj.url,
      variableTable: obj.variableTable,
      bodyText: obj.bodyText,
    };

    const base64 = encodeObjectToBase64Url(miniObj);

    console.log('convertObjToSlug');
    console.log(miniObj);
    console.log(base64);

    answer.push(base64);
  }

  return answer;
}

export function getHttpMethods() {
  const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
  return httpMethods;
}

export function convertSlugToObj(slug: string[]): RESTFulState {
  const httpMethods = getHttpMethods();
  let method: HttpMethod = 'GET'; // default
  let miniObj: RESTFulStateMini | undefined = undefined;

  if (slug.length > 0 && httpMethods.includes(slug[0] as HttpMethod)) {
    method = slug[0] as HttpMethod;
  }

  try {
    if (slug.length > 1) {
      console.log('convertSlugToObj');
      miniObj = decodeBase64UrlToObject(slug[1]);
    }
  } catch (error) {
    console.error('Failed to restore miniObj:', error);
  }

  const answer: RESTFulState = {
    method: method,
    url: '',
    variableTable: [],
    bodyType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    bodyText: '',
    response: undefined,
  };

  if (miniObj !== undefined) {
    answer.url = miniObj.url;
    answer.bodyText = miniObj.bodyText;
    answer.variableTable = miniObj.variableTable;
  }

  return answer;
}

export function encodeObjectToBase64Url(obj: RESTFulStateMini): string {
  try {
    const jsonString = JSON.stringify(obj);
    const base64 = btoa(jsonString);
    // Replace symbols with problems in URL
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error('Error encoding object to Base64 URL:', error);
    throw error;
  }
}

export function decodeBase64UrlToObject(base64Url: string): RESTFulStateMini {
  try {
    // Replace symbols with problems in URL back
    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), '=');
    const jsonString = atob(base64);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding Base64 URL to object:', error);
    throw error;
  }
}
