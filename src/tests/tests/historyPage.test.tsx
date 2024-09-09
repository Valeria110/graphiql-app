import HistoryPage from '@/app/[locale]/history/page';
import { useUser } from '@/hooks/authHook';
import { getSortedRequests } from '@/utils/historyUtils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

vi.mock('@/hooks/authHook', () => ({
  useUser: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockedTranslations = {
  HistoryPage: {
    HistoryPageTitle: 'History Requests',
    HistoryPaginationTitle: 'Page:',
    ErrorLC: 'An error occurred while retrieving your request history. Please try again later.',
    HistoryBtnClear: 'Clear history',
    HistoryBtnAsc: 'Asc',
    HistoryBtnDesc: 'Desc',
  },
};

type elementType = keyof typeof mockedTranslations.HistoryPage;

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
  useTranslations: (componentName: keyof typeof mockedTranslations) => (element: elementType) =>
    mockedTranslations[componentName][element],
}));

vi.mock('@/hooks/storeHooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('@/hooks/useRedirectToRequest', () => ({
  useRedirectToRequest: vi.fn(),
}));

vi.mock('@/app/loading', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('@/components/HistoryPageComponents/EmptyHistoryNotification', () => ({
  default: () => <div>Empty history</div>,
}));

vi.mock('@/components/LoginRequired/LoginRequired', () => ({
  default: () => <div>Login Required</div>,
}));

vi.mock('@/components/HistoryPageComponents/HistoryItem', () => ({
  default: () => <div>History Item</div>,
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('@/utils/historyUtils', () => ({
  getSortedRequests: vi.fn(),
}));

const mockUseRedirectToRequest = vi.fn();

describe('HistoryPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders LoginRequired when user is not available', () => {
    (useUser as Mock).mockReturnValue(null);
    render(<HistoryPage />);

    expect(screen.getByText('Login Required')).toBeInTheDocument();
  });

  it('renders error message when there is an error', async () => {
    (useUser as Mock).mockReturnValue(true);
    (getSortedRequests as Mock).mockImplementation(() => {
      throw new Error('Test error');
    });
    render(<HistoryPage />);

    await waitFor(() => {
      expect(
        screen.getByText('An error occurred while retrieving your request history. Please try again later.'),
      ).toBeInTheDocument();
    });
  });

  it('renders EmptyHistoryNotification when there are no requests', () => {
    (useUser as Mock).mockReturnValue(true);
    (getSortedRequests as Mock).mockReturnValue([]);

    render(<HistoryPage />);

    expect(screen.getByText('Empty history')).toBeInTheDocument();
  });

  it('renders request items and handles interactions correctly', () => {
    (useUser as Mock).mockReturnValue(true);

    (getSortedRequests as Mock).mockReturnValue([
      { id: 1, type: 'graphql', data: {} },
      { id: 2, type: 'restful', data: {} },
    ]);

    const mockRedirectToRequest = vi.fn();
    mockUseRedirectToRequest.mockReturnValue(mockRedirectToRequest);

    render(<HistoryPage />);

    expect(screen.getAllByText('History Item')).toHaveLength(2);

    fireEvent.click(screen.getByText('Asc'));
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('handles pagination changes', () => {
    (useUser as Mock).mockReturnValue(true);
    (getSortedRequests as Mock).mockReturnValue(
      Array.from({ length: 20 }, (_, i) => ({ id: i, type: 'graphql', data: {} })),
    );
    render(<HistoryPage />);

    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText('Page: 2')).toBeInTheDocument();
  });
});
