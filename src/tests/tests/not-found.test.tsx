import { render, screen } from '@testing-library/react';
import NotFound from '../../app/not-found';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    usePathname: () => '/en',
  };
});

describe('NotFound Page', () => {
  it('should render the NotFoundPage component in the NotFound page', () => {
    render(<NotFound />);
    expect(screen.getByText(/Not found page/i)).toBeInTheDocument();
  });
});
