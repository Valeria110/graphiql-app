import { render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import Playground from './Playground';
import StoreProvider from '../StoreProvider/StoreProvider';
import { useAppSelector } from '@/hooks/storeHooks';

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations: () => vi.fn(),
  };
});

vi.mock('../SectionDocs/Dosc', () => ({
  default: () => <div>Docs</div>,
}));

vi.mock('@/hooks/storeHooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe('Playground', () => {
  it('should render the component correctly', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({ textError: null });

    render(
      <StoreProvider>
        <Playground language="graphql" />
      </StoreProvider>,
    );

    expect(screen.getByTestId('playground-container')).toBeInTheDocument();
    expect(screen.getByTestId('playground')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(2);
  });

  it('displays error alert when textError is present', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({ textError: 'An error occurred' });

    render(<Playground language="graphql" />);

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
