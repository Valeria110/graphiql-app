import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loader from './Loader';

describe('Loader', () => {
  it('Should render the loader properly', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
