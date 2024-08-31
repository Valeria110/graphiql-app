import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFoundPage from './NotFoundPage';
import { useRouter } from 'next/navigation';
import { userEvent } from '@testing-library/user-event';

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
  };
});

describe('NotFoundPage', () => {
  it('Should render the NotFoundPage properly', async () => {
    const user = userEvent.setup();

    render(<NotFoundPage />);
    expect(screen.getByText(/not found page/i)).toBeInTheDocument();
    expect(screen.getByText(/back home/i)).toBeInTheDocument();

    await user.click(screen.getByText(/back home/i));
    expect(vi.mocked(useRouter)).toBeCalled();
  });
});
