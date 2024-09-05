import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GraphqlPage from '../../app/[locale]/graphql/[[...slug]]/page';
import StoreProvider from '@/components/StoreProvider/StoreProvider';

const mockedTranslations = {
  PlaygroundInputs: {
    urlUnput: 'Enter an endpoint url...',
    sdlUrlUnput: 'Enter a SDL url...',
  },
  GraphiqlToolsBar: {
    varsBtn: 'Variables',
    headersBtn: 'Headers',
  },
  Docs: {
    docsTitle: 'Documentation',
    queriesTitle: 'Queries',
    mutationsTitle: 'Mutations',
    subscriptionsTitle: 'Subscriptions',
    descriptionTitle: 'Description',
    typeTitle: 'Type',
    argsTitle: 'Arguments',
    fieldsTitle: 'Fields',
  },
};

type elementType = keyof typeof mockedTranslations.PlaygroundInputs &
  keyof typeof mockedTranslations.GraphiqlToolsBar &
  keyof typeof mockedTranslations.Docs;

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations: (componentName: keyof typeof mockedTranslations) => (element: elementType) =>
      mockedTranslations[componentName][element],
  };
});

describe('GraphQL Page', () => {
  it('renders the page with correct title and Playground component', () => {
    render(
      <StoreProvider>
        <GraphqlPage />
      </StoreProvider>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Graphi QL/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /headers/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /variables/i })).toBeInTheDocument();
  });
});
