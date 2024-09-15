import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from '../../app/layout';

vi.mock('next/font/google', () => ({
  Poppins: vi.fn(() => ({
    className: 'poppins-class',
  })),
}));

describe('RootLayout', () => {
  it('should render the HTML structure correctly', () => {
    render(
      <RootLayout>
        <div>Test Children</div>
      </RootLayout>,
    );

    expect(screen.getByRole('document')).toBeInTheDocument();
    expect(screen.getByText('Graphiql App')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.getAllByRole('generic').length).toBe(3);
  });
});
