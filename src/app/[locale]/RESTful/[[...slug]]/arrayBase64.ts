import { HttpMethod, RESTFulState, RESTFulStateMini, VariableRow } from '@/types/types';
import { formatFromBase64, formatToBase64 } from '@/utils/utils';

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
    answer.push(formatToBase64(JSON.stringify(miniObj)));
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
      console.log('slug[1]', slug[1]);
      const test1 = formatFromBase64(slug[1]);
      miniObj = JSON.parse(test1);
      console.log('востановили из URL miniObj', miniObj);
    }
  } catch {
    console.error('не удалось востановить miniObj');
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
