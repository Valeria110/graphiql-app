import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IntrospectionQuery } from 'graphql';
import { FC, ReactNode } from 'react';
import Subscriptions from './Subscriptions';
import { baseSchema } from '@/tests/mocks/baseSchema';

interface Query {
  name: string;
}

interface MockDocsItemProps {
  query: Query;
}

interface MockNestedItemProps {
  name: string;
  children?: ReactNode;
}

vi.mock('./DocsItem', async (importOriginal) => {
  const actual = (await importOriginal()) as { DocsItem: unknown };
  const MockDocsItem: FC<MockDocsItemProps> = ({ query }) => <div data-testid="docs-item">{query.name}</div>;
  MockDocsItem.displayName = 'MockDocsItem';
  return {
    ...actual,
    DocsItem: MockDocsItem,
  };
});

vi.mock('./NestedItem', () => {
  const MockNestedItem: FC<MockNestedItemProps> = ({ name, children }) => (
    <div data-testid="nested-item">
      {name}
      {children}
    </div>
  );

  MockNestedItem.displayName = 'MockNestedItem';
  return { default: MockNestedItem };
});

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    subscriptionsTitle: 'Subscriptions',
  };
  return translations[key] || key;
};

describe('Subscriptions component', () => {
  it('renders subscription fields when they are present', () => {
    const mockSchema: IntrospectionQuery = {
      __schema: {
        ...baseSchema.__schema,
        types: [
          {
            kind: 'OBJECT',
            name: 'Subscription',
            fields: [
              {
                name: 'onUserCreated',
                args: [],
                type: { kind: 'OBJECT', name: 'User' },
                isDeprecated: false,
                deprecationReason: undefined,
              },
              {
                name: 'onUserUpdated',
                args: [],
                type: { kind: 'OBJECT', name: 'User' },
                isDeprecated: false,
                deprecationReason: undefined,
              },
            ],
            interfaces: [],
          },
        ],
      },
    };

    render(<Subscriptions schema={mockSchema} t={mockT} />);

    expect(screen.getByText('Subscriptions')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Subscriptions'));
    expect(screen.getByText('onUserCreated')).toBeInTheDocument();
    expect(screen.getByText('onUserUpdated')).toBeInTheDocument();
  });

  it('renders null if the schema is not provided', () => {
    const emptySchema: IntrospectionQuery = {
      __schema: {
        queryType: { kind: 'OBJECT', name: 'Query' },
        mutationType: { kind: 'OBJECT', name: 'Mutation' },
        subscriptionType: null,
        types: [],
        directives: [],
      },
    };
    const { container } = render(<Subscriptions schema={emptySchema} t={mockT} />);
    expect(container.firstChild).toBeNull();
  });
});
