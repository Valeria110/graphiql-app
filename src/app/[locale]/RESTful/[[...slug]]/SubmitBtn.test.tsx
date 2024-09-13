import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RESTFulRequests } from '@/api/RESTFulRequests';
import { addObjectToLocalStorage } from '@/utils/utilsRESTful';
import RESTFulReducer from '@/features/RESTFul/RESTFulSlice';
import { describe, expect, it, Mock, vi } from 'vitest';
import SubmitBtn from './SubmitBtn';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => key),
}));

vi.mock('@/api/RESTFulRequests', () => ({
  RESTFulRequests: vi.fn(),
}));

vi.mock('@/utils/utilsRESTful', () => ({
  addObjectToLocalStorage: vi.fn(),
}));

const mockStore = configureStore({
  reducer: {
    RESTFul: RESTFulReducer,
  },
});

describe('SubmitBtn', () => {
  it('renders the button with correct text', () => {
    render(
      <Provider store={mockStore}>
        <SubmitBtn />
      </Provider>,
    );

    const button = screen.getByRole('button', { name: /SubmitBtn/i });
    expect(button).toBeInTheDocument();
  });

  it('calls addObjectToLocalStorage and RESTFulRequests on submit', async () => {
    const mockResponse = { data: 'mock data' };
    (RESTFulRequests as Mock).mockResolvedValue(mockResponse);

    render(
      <Provider store={mockStore}>
        <SubmitBtn />
      </Provider>,
    );

    const button = screen.getByRole('button', { name: /SubmitBtn/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(addObjectToLocalStorage).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(RESTFulRequests).toHaveBeenCalled();
      expect(mockStore.getState().RESTFul.response).toEqual(mockResponse);
    });
  });
});
