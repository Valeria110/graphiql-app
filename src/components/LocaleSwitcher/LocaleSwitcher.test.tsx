import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LocaleSwitcher from './LocaleSwitcher';

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations: vi.fn(),
  };
});

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    usePathname: () => '/en',
  };
});

describe('LocaleSwitcher', () => {
  it('should render the component correctly', () => {
    render(<LocaleSwitcher />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
