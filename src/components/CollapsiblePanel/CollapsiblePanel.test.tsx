import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, vi, expect } from 'vitest';
import CollapsiblePanel from './CollapsiblePanel';
import { RootState } from '@/store/store';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockStateSelector = (state: RootState): boolean => state.RESTFul.isHeaderTableOpen ?? false;
const mockToggleAction = vi.fn(() => ({ type: 'TOGGLE_HEADER_TABLE' }));

const store = configureStore({
  reducer: {
    RESTFul: (state = { isHeaderTableOpen: false }, action: { type: string }) => {
      if (action.type === 'TOGGLE_HEADER_TABLE') return { ...state, isHeaderTableOpen: !state.isHeaderTableOpen };
      return state;
    },
  },
});

describe('CollapsiblePanel Component', () => {
  it('should render CollapsiblePanel with the correct initial button text', () => {
    render(
      <Provider store={store}>
        <CollapsiblePanel
          tabName="Test Tab"
          tabLength={5}
          stateSelector={mockStateSelector}
          toggleAction={mockToggleAction}
        >
          <div>Panel Content</div>
        </CollapsiblePanel>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Show Test Tab (5)');
  });

  it('should display children when the panel is open', () => {
    store.getState = () => ({ RESTFul: { isHeaderTableOpen: true } });
    render(
      <Provider store={store}>
        <CollapsiblePanel
          tabName="Test Tab"
          tabLength={5}
          stateSelector={mockStateSelector}
          toggleAction={mockToggleAction}
        >
          <div>Panel Content</div>
        </CollapsiblePanel>
      </Provider>,
    );

    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('should call toggleAction when the button is clicked', () => {
    render(
      <Provider store={store}>
        <CollapsiblePanel
          tabName="Test Tab"
          tabLength={5}
          stateSelector={mockStateSelector}
          toggleAction={mockToggleAction}
        >
          <div>Panel Content</div>
        </CollapsiblePanel>
      </Provider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleAction).toHaveBeenCalled();
  });
});
