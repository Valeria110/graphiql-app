import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SectionWelcome from './SectionWelcome';
import { useAuthState } from 'react-firebase-hooks/auth';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    sectionWelcomeTitle: 'Welcome',
    sectionWelcomeSubtitle: 'Subtitle',
    sectionWelcomeDescription: 'This is a description',
    sectionWelcomeBtnRestClient: 'REST Client',
    sectionWelcomeBtnGraphiQLClient: 'GraphQL Client',
    sectionWelcomeBtnHistory: 'History',
    sectionWelcomebtnSignIn: 'Sign In',
    sectionWelcomebtnSignUp: 'Sign Up',
  };
  return translations[key] || key;
};

vi.mock('@/firebase', () => {
  const mockAuth = {
    signInWithEmailAndPassword: vi.fn().mockReturnValue(Promise.resolve()),
  };

  return {
    auth: mockAuth,
  };
});

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
  };
});

vi.mock('react-firebase-hooks/auth', () => {
  return {
    useAuthState: vi.fn(),
  };
});

describe('SectionWelcome', () => {
  it('renders welcome message for authenticated user', () => {
    vi.mock('react-firebase-hooks/auth', () => ({
      useAuthState: vi.fn(() => [{ email: 'testuser@example.com' }, false, undefined]),
    }));

    render(<SectionWelcome t={mockT} />);

    expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('renders welcome message for unauthenticated user', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    render(<SectionWelcome t={mockT} />);

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders logos correctly', () => {
    render(<SectionWelcome t={mockT} />);

    const restLogoElement = screen.getByAltText('restLogo');
    expect(restLogoElement).toBeInTheDocument();

    const graphQLLogoElement = screen.getByAltText('graphQLLogo');
    expect(graphQLLogoElement).toBeInTheDocument();
  });
});
