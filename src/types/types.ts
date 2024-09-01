import { IntrospectionQuery } from 'graphql';

export type CodeEditorLanguage = 'graphql' | 'javascript' | 'json';

export enum PagesRoutes {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  Graphql = 'graphql',
  History = 'history',
}

export interface SectionsProps {
  t: (arg0: string) => string;
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
