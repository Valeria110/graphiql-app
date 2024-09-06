import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EmptyHistoryNotification from './EmptyHistoryNotification';

vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
}));

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    EmptyHistory: 'Your history is empty',
    HistoryBtnRest: 'Go to REST Client',
    HistoryBtnGraphiQL: 'Go to GraphiQL Client',
  };
  return translations[key] || key;
};

describe('EmptyHistoryNotification', () => {
  it('renders the title text', () => {
    render(<EmptyHistoryNotification t={mockT} />);

    expect(screen.getByText('Your history is empty')).toBeInTheDocument();
  });

  it('renders navigation buttons with correct text and href attributes', () => {
    render(<EmptyHistoryNotification t={mockT} />);

    const restLink = screen.getByText('Go to REST Client');
    const graphqlLink = screen.getByText('Go to GraphiQL Client');

    expect(restLink).toBeInTheDocument();
    expect(graphqlLink).toBeInTheDocument();

    expect(restLink).toHaveAttribute('href', '/en/RESTful');
    expect(graphqlLink).toHaveAttribute('href', '/en/graphql');
  });
});
