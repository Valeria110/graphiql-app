export type CodeEditorLanguage = 'graphql' | 'javascript' | 'json';

export enum PagesRoutes {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  Graphql = 'graphql',
}

export interface SectionsProps {
  t: (arg0: string) => string;
}
