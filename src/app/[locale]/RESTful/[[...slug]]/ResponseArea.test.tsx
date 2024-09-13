import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, vi, expect } from 'vitest';
import ResponseArea from './ResponseArea';
import { RESTFulState } from '@/types/types';

vi.mock('@monaco-editor/react', () => ({
  Editor: ({ value }: { value?: string }) => <div data-testid="editor">{value}</div>,
}));
vi.mock('@/components/Loader/Loader', () => ({
  default: () => <div>Loading...</div>,
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const initialState: RESTFulState = {
  method: 'POST',
  bodyText: '',
  bodyType: 'json',
  variableTable: [],
  headers: [],
  url: '',
  urlInner: '',
  isInitialized: false,
  date: '',
  response: {
    responseText: '{"key": "value"}',
    timeMs: 123,
    code: 200,
  },
};

const store = configureStore({
  reducer: {
    RESTFul: (state = initialState, action) => {
      switch (action.type) {
        default:
          return state;
      }
    },
  },
});

describe('ResponseArea Component', () => {
  it('should render ResponseArea and display editor with response text', () => {
    render(
      <Provider store={store}>
        <ResponseArea />
      </Provider>,
    );

    const editor = screen.getByTestId('editor');
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveTextContent('{"key": "value"}');
  });
});

describe('ResponseAreaBar Component', () => {
  it('should render ResponseAreaBar and display the time and code', () => {
    render(
      <Provider store={store}>
        <ResponseArea />
      </Provider>,
    );

    expect(screen.getByText('Time: 123 Ms')).toBeInTheDocument();
    expect(screen.getByText('Code: 200')).toBeInTheDocument();
  });

  it('should render ResponseAreaBar with correct colors for status code', () => {
    render(
      <Provider store={store}>
        <ResponseArea />
      </Provider>,
    );

    const codeText = screen.getByText('Code: 200');
    expect(codeText).toHaveStyle('color: #2e7d32');
  });
});
