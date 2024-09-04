import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
import Header from './Header';

const mockedTranslations = {
  AuthPages: {
    labelEmail: 'Email',
    labelPassword: 'Password',
    btnSignUp: 'Sign up',
    btnSignIn: 'Sign in',
    btnSignOut: 'Sign out',
  },
  BurgerMenu: {
    signOutBtn: 'Sign Out',
    signInBtn: 'Sign In',
  },
};

type ElementType = keyof typeof mockedTranslations.AuthPages & keyof typeof mockedTranslations.BurgerMenu;

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations: (componentName: keyof typeof mockedTranslations) => (element: ElementType) =>
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

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    usePathname: () => '/en',
  };
});

describe('Header', () => {
  it('should render the component correctly', () => {
    vi.mock('react-firebase-hooks/auth', () => {
      return {
        useAuthState: vi.fn(() => {
          return [null, false, undefined];
        }),
      };
    });

    render(
      <StoreProvider>
        <Header />
      </StoreProvider>,
    );

    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    screen.getAllByText(/language/i).forEach((item) => expect(item).toBeInTheDocument());
  });

  it('should render the sign Out button when a user is signed in', () => {
    vi.mock('react-firebase-hooks/auth', () => ({
      useAuthState: vi.fn(() => [{ uid: 'some-user-id' }, false, undefined]),
    }));

    render(
      <StoreProvider>
        <Header />
      </StoreProvider>,
    );

    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sign in' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sign up' })).not.toBeInTheDocument();
  });
});
