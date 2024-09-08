import { render } from '@testing-library/react';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ClientRedirect from '@/components/ClientRedirect/ClientRedirect';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('@/firebase', () => {
  return {
    auth: {
      onAuthStateChanged: vi.fn(() => {
        return () => {};
      }),
    },
  };
});

describe('ClientRedirect', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockOnAuthStateChanged = vi.fn();

  it('should not redirect if user is authenticated', async () => {
    mockOnAuthStateChanged.mockImplementationOnce((callback) => {
      callback({ uid: '123' });
      return () => {};
    });

    const { push } = useRouter();

    await act(async () => {
      render(<ClientRedirect />);
    });

    expect(push).not.toHaveBeenCalled();
  });
});
