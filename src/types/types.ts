export type CodeEditorLanguage = 'graphql' | 'javascript';

export enum PagesRoutes {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  Graphql = 'graphql',
}

export interface SectionsProps {
  t: (arg0: string) => string;
}
