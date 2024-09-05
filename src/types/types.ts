import { IntrospectionQuery } from 'graphql';

export type CodeEditorLanguage = 'graphql' | 'javascript' | 'json';

export enum PagesRoutes {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  Graphql = 'graphql',
  History = 'history',
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
  value: string;
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
  bodyType: BodyType;
  response?: ResponseObj;
  urlInner: string;
  isInitialized: boolean;
  date: string;
  isVariableTableOpen?: boolean;
}

export type BodyType = 'text' | 'json';

export interface RESTFulStateMini {
  url: string;
  variableTable: VariableRow[];
  bodyText: string;
}

export interface DocsSectionProps {
  schema: IntrospectionQuery;
  t: (arg0: string) => string;
}

export interface GraphqlRequest {
  url: string;
  sdlUrl?: string;
  body: string;
  headers?: Record<string, string> | null;
  variables?: Record<string, string> | null;
  date: string;
}
