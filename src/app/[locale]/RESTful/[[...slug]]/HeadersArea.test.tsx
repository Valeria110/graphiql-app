import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import HeadersArea from './HeadersArea';
import { RESTFulState } from '@/types/types';
import RESTFulReducer from './../../../../features/RESTFul/RESTFulSlice';

const initialState: RESTFulState = {
  method: 'GET',
  url: '',
  variableTable: [],
  bodyType: 'json',
  headers: [],
  bodyText: '',
  urlInner: 'GET',
  response: undefined,
  isInitialized: false,
  date: '',
  isHeaderTableOpen: false,
};

const createStoreWithState = (state: Partial<RESTFulState>) =>
  configureStore({
    reducer: {
      RESTFul: RESTFulReducer,
    },
    preloadedState: { RESTFul: { ...initialState, ...state } },
  });

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {};
    return translations[key] || key;
  },
}));

describe('HeadersArea Component', () => {
  it('should render HeadersArea with initial state', () => {
    const store = createStoreWithState({ headers: [], isHeaderTableOpen: false });
    render(
      <Provider store={store}>
        <HeadersArea />
      </Provider>,
    );
    expect(screen.getByText(/AddHeaderBtn/i)).toBeInTheDocument();
  });

  it('should add a header row when Add Header button is clicked', () => {
    const store = createStoreWithState({ headers: [], isHeaderTableOpen: true });
    render(
      <Provider store={store}>
        <HeadersArea />
      </Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /AddHeaderBtn/i }));
    expect(screen.getAllByRole('textbox')).toHaveLength(2); // 2 textboxes in 1 row (header and value)
  });

  it('should remove a header row when Delete button is clicked', () => {
    const store = createStoreWithState({
      headers: [['header1', 'value1']],
      isHeaderTableOpen: true,
    });
    render(
      <Provider store={store}>
        <HeadersArea />
      </Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(screen.queryByPlaceholderText('Header')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Value')).not.toBeInTheDocument();
  });
});
