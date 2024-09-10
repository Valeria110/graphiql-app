import { setOpenDocs } from '@/features/graphiql/docs.slice';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Docs from './Dosc';
import configureStore from 'redux-mock-store';
import { baseSchema } from '@/tests/mocks/baseSchema';

vi.mock('./SubsectionsDocs/Mutations', () => ({
  default: () => <div>Mutations Component</div>,
}));

vi.mock('./SubsectionsDocs/Subscriptions', () => ({
  default: () => <div>Subscriptions Component</div>,
}));

vi.mock('./SubsectionsDocs/Queries', () => ({
  default: () => <div>Queries Component</div>,
}));

vi.mock('./storeHooks', () => ({
  useAppDispatch: vi.fn(),
}));

const mockedTranslations = {
  Docs: {
    docsTitle: 'Documentation',
  },
};

type ElementType = keyof typeof mockedTranslations.Docs;

vi.mock('next-intl', () => {
  return {
    useTranslations: (componentName: keyof typeof mockedTranslations) => (element: ElementType) =>
      mockedTranslations[componentName][element],
  };
});

const mockStore = configureStore([]);

describe('Docs Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      docs: {
        schema: null,
        isOpen: false,
        textError: null,
      },
    });
  });

  it('should render Queries, Mutations, and Subscriptions when schema is present', () => {
    store = mockStore({
      docs: {
        schema: {
          __schema: {
            ...baseSchema.__schema,
          },
        },
        isOpen: true,
        textError: null,
      },
    });

    render(
      <Provider store={store}>
        <Docs />
      </Provider>,
    );

    expect(screen.getByText('Documentation'));
    fireEvent.click(screen.getByText('Documentation'));
    expect(screen.getByText('Queries Component')).toBeInTheDocument();
    expect(screen.getByText('Mutations Component')).toBeInTheDocument();
    expect(screen.getByText('Subscriptions Component')).toBeInTheDocument();
  });

  it('should close docs when close button is clicked', () => {
    store = mockStore({
      docs: {
        schema: {
          ...baseSchema.__schema,
        },
        isOpen: true,
        textError: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Docs />
      </Provider>,
    );

    const closeButton = container.querySelector('button');
    fireEvent.click(closeButton as HTMLButtonElement);

    const actions = store.getActions();
    expect(actions).toContainEqual(setOpenDocs(false));
  });

  it('should close docs if there is a textError', () => {
    store = mockStore({
      docs: {
        schema: null,
        isOpen: true,
        textError: 'Error',
      },
    });

    render(
      <Provider store={store}>
        <Docs />
      </Provider>,
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(setOpenDocs(false));
  });
});
