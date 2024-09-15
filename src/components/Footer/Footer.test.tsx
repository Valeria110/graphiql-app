import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('Should render the Footer properly', () => {
    render(<Footer />);
    expect(screen.getByText(/Valeria110/i)).toBeInTheDocument();
    expect(screen.getByText(/MikhailSemenuk/i)).toBeInTheDocument();
    expect(screen.getByText(/qwgfsehte/i)).toBeInTheDocument();
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
});
