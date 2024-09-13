import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, vi, expect } from 'vitest';
import BodyArea from './BodyArea';
import { RESTFulState } from '@/types/types';

vi.mock('@monaco-editor/react', () => ({
  Editor: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <textarea data-testid="editor" value={value} onChange={(e) => onChange(e.target.value)} />
  ),
}));
vi.mock('@/components/Loader/Loader', () => ({
  default: () => {
    const Loader = () => <div>Loading...</div>;
    Loader.displayName = 'Loader';
    return Loader;
  },
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
};

const store = configureStore({
  reducer: {
    RESTFul: (state = initialState, action) => {
      switch (action.type) {
        case 'RESTFul/setBodyText':
          return { ...state, bodyText: action.payload };
        case 'RESTFul/setBodyType':
          return { ...state, bodyType: action.payload };
        default:
          return state;
      }
    },
  },
});

describe('BodyArea Component', () => {
  it('should correctly render BodyBarArea and editor', () => {
    render(
      <Provider store={store}>
        <BodyArea />
      </Provider>,
    );

    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'FillBtn' })).toBeInTheDocument();
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('should update editor value and dispatch setBodyText on blur', () => {
    render(
      <Provider store={store}>
        <BodyArea />
      </Provider>,
    );

    const editor = screen.getByTestId('editor');
    fireEvent.change(editor, { target: { value: 'Updated body text' } });
    fireEvent.blur(editor);

    expect(store.getState().RESTFul.bodyText).toBe('Updated body text');
  });
});
