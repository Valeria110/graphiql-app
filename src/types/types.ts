export type CodeEditorLanguage = 'graphql' | 'javascript' | 'json';

export enum PagesRoutes {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  Graphql = 'graphql',
  RESTFul = 'RESTful',
}

export type HttpMethod = 'GET' | 'POST';

export interface SectionsProps {
  t: (arg0: string) => string;
}

export interface ResponseCodeTime {
  code: Response['status'] | undefined;
  timeMs: number | undefined;
}
