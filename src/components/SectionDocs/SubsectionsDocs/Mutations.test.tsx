import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Mutations from './Mutations';
import { IntrospectionQuery } from 'graphql';
import { FC } from 'react';
import { baseSchema } from '@/tests/mocks/baseSchema';
import { MockDocsItemProps, MockNestedItemProps } from '@/tests/mocks/mockTypesForDocsTests';

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
    mutationsTitle: 'Mutations',
  };
  return translations[key] || key;
};

describe('Mutations component', () => {
  it('renders mutation fields when they are present', () => {
    const mockSchema: IntrospectionQuery = {
      __schema: {
        ...baseSchema.__schema,
        types: [
          {
            kind: 'OBJECT',
            name: 'Mutation',
            fields: [
              {
                name: 'createUser',
                args: [],
                type: { kind: 'OBJECT', name: 'NestedType' },
                isDeprecated: false,
                deprecationReason: undefined,
              },
              {
                name: 'updateUser',
                args: [],
                type: { kind: 'OBJECT', name: 'NestedType' },
                isDeprecated: false,
                deprecationReason: undefined,
              },
            ],
            interfaces: [],
          },
        ],
      },
    };

    render(<Mutations schema={mockSchema} t={mockT} />);
    expect(screen.getByText('Mutations')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Mutations'));
    expect(screen.getByText('createUser')).toBeInTheDocument();
    expect(screen.getByText('updateUser')).toBeInTheDocument();
  });

  it('renders null if the schema is not provided', () => {
    const emptySchema: IntrospectionQuery = {
      __schema: {
        queryType: { kind: 'OBJECT', name: 'Query' },
        mutationType: null,
        subscriptionType: null,
        types: [],
        directives: [],
      },
    };

    const { container } = render(<Mutations schema={emptySchema} t={mockT} />);
    expect(container.firstChild).toBeNull();
  });
});
