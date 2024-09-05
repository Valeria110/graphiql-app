import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { describe, expect, it, vi } from 'vitest';
import * as useUser from '@/hooks/authHook';
import { User } from 'firebase/auth';

const mockedTranslations = {
  LoginRequired: {
    InfoText: 'Please, sign in to open the',
    signInBtn: 'Sign in',
    GraphQLText: 'GraphQL Playground',
    HistoryText: 'history requests',
    RESTText: 'RESTFull Playground',
  },
};

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations:
      (componentName: keyof typeof mockedTranslations) => (element: keyof typeof mockedTranslations.LoginRequired) =>
        mockedTranslations[componentName][element],
  };
});

vi.mock('@/firebase', () => {
  const mockAuth = {
    signInWithEmailAndPassword: vi.fn().mockReturnValue(Promise.resolve()),
    logOut: vi.fn().mockReturnValue(Promise.resolve()),
  };

  return {
    auth: mockAuth,
  };
});

describe('graphql layout', () => {
  it('should render a Loader when user is loading', () => {
    vi.spyOn(useUser, 'useUser').mockReturnValue(false);

    render(
      <Layout>
        <div>Children</div>
      </Layout>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render LoginRequired when user is not authenticated', () => {
    vi.spyOn(useUser, 'useUser').mockReturnValue(null);

    render(
      <Layout>
        <div>Children</div>
      </Layout>,
    );
    expect(
      screen.getByText(`${mockedTranslations.LoginRequired.InfoText} ${mockedTranslations.LoginRequired.GraphQLText}`),
    ).toBeInTheDocument();
  });

  it('should render children when a user is authenticated', () => {
    vi.spyOn(useUser, 'useUser').mockReturnValue({ email: 'test@example.com' } as User);

    render(
      <Layout>
        <div>Children</div>
      </Layout>,
    );
    expect(screen.getByText(/Children/i)).toBeInTheDocument();
  });
});
