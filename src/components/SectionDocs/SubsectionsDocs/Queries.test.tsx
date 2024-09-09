import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IntrospectionQuery } from 'graphql';
import { FC, ReactNode } from 'react';
import Queries from './Queries';
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
    queriesTitle: 'Queries',
  };
  return translations[key] || key;
};

describe('Queries component', () => {
  it('renders query fields when they are present', () => {
    const mockSchema: IntrospectionQuery = {
      __schema: {
        ...baseSchema.__schema,
        types: [
          {
            kind: 'OBJECT',
            name: 'Query',
            fields: [
              {
                name: 'getUser',
                args: [],
                type: { kind: 'OBJECT', name: 'User' },
                isDeprecated: false,
                deprecationReason: undefined,
              },
              {
                name: 'getUsers',
                args: [],
                type: { kind: 'OBJECT', name: 'UserList' },
                isDeprecated: false,
                deprecationReason: undefined,
              },
            ],
            interfaces: [],
          },
        ],
      },
    };

    render(<Queries schema={mockSchema} t={mockT} />);

    expect(screen.getByText('Queries')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Queries'));
    expect(screen.getByText('getUser')).toBeInTheDocument();
    expect(screen.getByText('getUsers')).toBeInTheDocument();
  });

  it('renders null if the schema is not provided', () => {
    const emptySchema: IntrospectionQuery = {
      __schema: {
        queryType: {
          kind: 'OBJECT',
          name: 'Query',
        },
        mutationType: null,
        subscriptionType: null,
        types: [],
        directives: [],
      },
    };

    const { container } = render(<Queries schema={emptySchema} t={mockT} />);
    expect(container.firstChild).toBeNull();
  });
});
