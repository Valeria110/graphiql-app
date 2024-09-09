import { act, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ClientRedirect from '@/components/ClientRedirect/ClientRedirect';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { onAuthStateChanged, User } from 'firebase/auth';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

describe('ClientRedirect', () => {
  const mockPush = vi.fn();
  const mockLocale = 'en';
  const mockRouter = {
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  };

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useLocale).mockReturnValue(mockLocale);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to the localActive route after authentication', async () => {
    const mockUnsubscribe = vi.fn();
    const user: Partial<User> = { uid: '123' };

    vi.mocked(onAuthStateChanged).mockImplementation((_, nextOrObserver) => {
      if (typeof nextOrObserver === 'function') {
        nextOrObserver(user as User);
        nextOrObserver(null);
      }
      return mockUnsubscribe;
    });

    await act(async () => {
      render(<ClientRedirect />);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(`/${mockLocale}/`);
    });
  });
});
