import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BurgerMenu from './BurgerMenu';
import * as useAuthState from 'react-firebase-hooks/auth';
import { user } from '@/tests/mocks/firebaseUser';

const mockedTranslations = {
  BurgerMenu: {
    signOutBtn: 'Sign Out',
    signInBtn: 'Sign In',
  },
};

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    usePathname: () => '/en',
  };
});

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations:
      (componentName: keyof typeof mockedTranslations) => (element: keyof typeof mockedTranslations.BurgerMenu) =>
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

describe('BurgerMenu', () => {
  it('Should render the BurgerMenu component properly when a user is signed in', () => {
    vi.spyOn(useAuthState, 'useAuthState').mockReturnValue([user, false, undefined]);

    render(<BurgerMenu />);
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('Should render Sign In button when user is not signed in', () => {
    vi.spyOn(useAuthState, 'useAuthState').mockReturnValue([null, false, undefined]);

    render(<BurgerMenu />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
