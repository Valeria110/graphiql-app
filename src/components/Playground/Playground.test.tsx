import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Playground from './Playground';
import StoreProvider from '../StoreProvider/StoreProvider';

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations: () => vi.fn(),
  };
});

describe('Playground', () => {
  it('should render the component correctly', () => {
    render(
      <StoreProvider>
        <Playground language="graphql" />
      </StoreProvider>,
    );

    expect(screen.getByTestId('playground-container')).toBeInTheDocument();
    expect(screen.getByTestId('playground')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(2);
  });
});
