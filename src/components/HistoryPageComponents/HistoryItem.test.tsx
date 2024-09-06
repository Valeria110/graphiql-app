import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HistoryItem from './HistoryItem';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    HistoryTypeTitle: 'Type:',
    HistoryMethodTitle: 'Method:',
    HistoryUrlTitle: 'URL:',
    HistoryDateTitle: 'Date:',
  };
  return translations[key] || key;
};

describe('HistoryItem', () => {
  const handleRequestClick = vi.fn();

  it('renders RESTful request correctly', () => {
    const request = {
      method: 'GET',
      url: 'http://example.com/api',
      date: new Date().toISOString(),
      body: '',
    };

    render(<HistoryItem request={request} handleRequestClick={handleRequestClick} t={mockT} />);

    expect(screen.getByText('RESTfull')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('URL:')).toBeInTheDocument();
    expect(screen.getByText('http://example.com/api')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
  });

  it('renders GraphQL request correctly', () => {
    const request = {
      url: 'http://example.com/graphql',
      date: new Date().toISOString(),
      body: '',
    };

    render(<HistoryItem request={request} handleRequestClick={handleRequestClick} t={mockT} />);

    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(screen.queryByText('Method:')).not.toBeInTheDocument();
    expect(screen.getByText('URL:')).toBeInTheDocument();
    expect(screen.getByText('http://example.com/graphql')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
  });

  it('calls handleRequestClick with correct request when URL button is clicked', () => {
    const request = {
      url: 'http://example.com/click',
      date: new Date().toISOString(),
      body: '',
    };

    render(<HistoryItem request={request} handleRequestClick={handleRequestClick} t={mockT} />);

    fireEvent.click(screen.getByText('http://example.com/click'));

    expect(handleRequestClick).toHaveBeenCalledWith(request);
  });
});
