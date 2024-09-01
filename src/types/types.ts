export type CodeEditorLanguage = 'graphql' | 'javascript' | 'json';

export enum PagesRoutes {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  Graphql = 'graphql',
  RESTFul = 'RESTful',
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface SectionsProps {
  t: (arg0: string) => string;
}

export interface ResponseCodeTime {
  code: Response['status'] | undefined;
  timeMs: number | undefined;
}

export interface VariableRow {
  variable: string;
  value: string | number;
}

export interface ResponseObj {
  code: Response['status'];
  timeMs: number;
  responseText: string;
}

export interface RESTFulState {
  method: HttpMethod;
  url: string;
  variableTable: VariableRow[];
  headers?: HeadersInit;
  bodyText: string;
  bodyType: 'plain text' | 'json';
  response?: ResponseObj;
}

export interface RESTFulStateMini {
  url: string;
  variableTable: VariableRow[];
  bodyText: string;
}
