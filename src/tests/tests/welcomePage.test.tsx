import WelcomePage from '@/app/[locale]/page';
import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { describe, expect, it, Mock, vi } from 'vitest';

vi.mock('@/components/SectionWelcome/SectionWelcome', () => ({
  default: () => <div>Section Welcome</div>,
}));

vi.mock('@/components/SectionProject/SectionProject', () => ({
  default: () => <div>Section Project</div>,
}));

vi.mock('@/components/SectionTeam/SectionTeam', () => ({
  default: () => <div>Section Team</div>,
}));

vi.mock('@/components/SectionCourse/SectionCourse', () => ({
  default: () => <div>Section Course</div>,
}));

vi.mock('@/components/Loader/Loader', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('react-firebase-hooks/auth', () => {
  return {
    useAuthState: vi.fn(),
  };
});

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

describe('WelcomePage', () => {
  it('renders Loader when loading is true', () => {
    (useAuthState as Mock).mockReturnValue([null, true]);

    render(<WelcomePage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Section Welcome')).toBeNull();
  });

  it('renders sections when loading is false', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(<WelcomePage />);

    expect(screen.getByText('Section Welcome')).toBeInTheDocument();
    expect(screen.getByText('Section Project')).toBeInTheDocument();
    expect(screen.getByText('Section Team')).toBeInTheDocument();
    expect(screen.getByText('Section Course')).toBeInTheDocument();
  });
});
