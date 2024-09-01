import { RESTFulState, VariableRow } from '@/types/types';

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
  answer.push(obj.method);
  answer.push();

  return answer;
}
