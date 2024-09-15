import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ExampleBtn from './ExampleBtn';
import { setObj, updateURLInner } from '@/features/RESTFul/RESTFulSlice';
import { RESTFulState } from '@/types/types';

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      useDispatch: () => mockDispatch,
    };
  }
  throw new Error('Imported module is not an object');
});

const mockT = vi.fn().mockImplementation((key) => {
  switch (key) {
    case 'RESTful.ExampleBtn.ExampleBodyTitle':
      return 'Example Title';
    case 'RESTful.ExampleBtn.ExampleBodyValue':
      return 'Example Value';
    case 'RESTful.ExampleBtn.FillBtn':
      return 'FillBtn';
    default:
      return key;
  }
});
vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
}));

// Создание фиктивного Redux store
const store = configureStore({
  reducer: {
    restFul: (state = {} as RESTFulState) => state,
  },
});

const mockDispatch = vi.fn();

describe('ExampleBtn Component', () => {
  it('should render button with correct text', () => {
    render(
      <Provider store={store}>
        <ExampleBtn />
      </Provider>,
    );

    expect(screen.getByRole('button', { name: 'FillBtn' })).toBeInTheDocument();
  });

  it('should dispatch actions on button click', () => {
    render(
      <Provider store={store}>
        <ExampleBtn />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'FillBtn' }));

    const expectedBodyObj = {
      likes: 30,
      title: 'ExampleBodyTitle',
      body: '__body__',
    };
    const formattedBodyText = JSON.stringify(expectedBodyObj, null, 2);

    const expectedObj: RESTFulState = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      variableTable: [
        {
          variable: 'body',
          value: 'ExampleBodyValue',
        },
      ],
      bodyText: formattedBodyText,
      bodyType: 'json',
      urlInner: '',
      isInitialized: true,
      date: '',
      headers: [['Content-Type', 'application/json']],
    };

    expect(mockDispatch).toHaveBeenCalledWith(setObj(expectedObj));
    expect(mockDispatch).toHaveBeenCalledWith(updateURLInner());
  });
});
