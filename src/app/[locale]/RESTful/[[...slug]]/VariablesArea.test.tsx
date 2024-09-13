import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import VariablesArea from './VariablesArea';
import { RESTFulState } from '@/types/types';
import RESTFulReducer from './../../../../features/RESTFul/RESTFulSlice';

// Define the complete initial state
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

describe('VariablesArea Component', () => {
  it('should render VariablesArea with initial state', () => {
    const store = createStoreWithState({ variableTable: [], isVariableTableOpen: false });
    render(
      <Provider store={store}>
        <VariablesArea />
      </Provider>,
    );
    // Check if the add row button is present
    expect(screen.getByText(/AddRowBtn/i)).toBeInTheDocument();
  });

  it('should add a row when Add Row button is clicked', () => {
    const store = createStoreWithState({ variableTable: [], isVariableTableOpen: true });
    render(
      <Provider store={store}>
        <VariablesArea />
      </Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /AddRowBtn/i }));
    expect(screen.getAllByRole('textbox')).toHaveLength(2); // 2 textbox in 1 row
  });

  it('should update variable value on input change and blur', () => {
    const store = createStoreWithState({
      variableTable: [{ variable: 'var1', value: 'value1' }],
      isVariableTableOpen: true,
    });
    render(
      <Provider store={store}>
        <VariablesArea />
      </Provider>,
    );
    const input = screen.getByPlaceholderText('value');
    fireEvent.change(input, { target: { value: 'newVariable' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('newVariable');
  });

  it('should remove a row when Delete button is clicked', () => {
    const store = createStoreWithState({
      variableTable: [{ variable: 'var1', value: 'value1' }],
      isVariableTableOpen: true,
    });
    render(
      <Provider store={store}>
        <VariablesArea />
      </Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
