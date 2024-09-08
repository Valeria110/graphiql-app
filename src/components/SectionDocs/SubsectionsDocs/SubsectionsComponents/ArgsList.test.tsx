import { fireEvent, render, screen } from '@testing-library/react';
import { IntrospectionInputObjectType, IntrospectionInputValue, IntrospectionQuery } from 'graphql';
import { describe, expect, it, Mock, vi } from 'vitest';
import { ArgItem, ArgsList } from './ArgsList';
import { findKeyValue } from '@/utils/docsUtils';

const mockedTranslations = {
  Docs: {
    argsTitle: 'Arguments',
  },
};

type ElementType = keyof typeof mockedTranslations.Docs;

vi.mock('next-intl', () => {
  return {
    useTranslations: (componentName: keyof typeof mockedTranslations) => (element: ElementType) =>
      mockedTranslations[componentName][element],
  };
});

vi.mock('./FieldsList', () => ({
  InputFieldsList: vi.fn(() => {
    return <div>Input Fields List</div>;
  }),
}));

vi.mock('@/utils/docsUtils', () => ({
  filterSchemaTypes: vi.fn(
    (schema, nameType) =>
      schema.__schema.types.find((type: IntrospectionInputObjectType) => type.name === nameType) || null,
  ),
  findKeyValue: vi.fn((_, key) => (key === 'name' ? 'MockType' : null)),
}));

describe('ArgsList', () => {
  const mockArgs: IntrospectionInputValue[] = [
    { name: 'arg1', type: { kind: 'SCALAR', name: 'String' }, defaultValue: null },
    { name: 'arg2', type: { kind: 'SCALAR', name: 'Int' }, defaultValue: null },
  ];

  const mockSchema: IntrospectionQuery = {
    __schema: {
      queryType: { name: 'Query', kind: 'OBJECT' },
      mutationType: null,
      subscriptionType: null,
      types: [],
      directives: [],
    },
  };

  it('renders a button of arguments', () => {
    render(<ArgsList args={mockArgs} schema={mockSchema} />);
    expect(screen.getByRole('button', { name: 'Arguments' })).toBeInTheDocument();
  });

  it('shows the argument list when expanded', () => {
    render(<ArgsList args={mockArgs} schema={mockSchema} />);

    const button = screen.getByRole('button', { name: 'Arguments' });
    fireEvent.click(button);
    expect(screen.getByText('arg1: String')).toBeVisible();
    expect(screen.getByText('arg2: Int')).toBeVisible();
  });
});

describe('ArgItem', () => {
  const mockArg: IntrospectionInputValue = {
    name: 'mockArg',
    type: { kind: 'INPUT_OBJECT', name: 'MockType' },
    defaultValue: null,
  };

  const mockSchema: IntrospectionQuery = {
    __schema: {
      queryType: { name: 'Query', kind: 'OBJECT' },
      mutationType: null,
      subscriptionType: null,
      types: [
        {
          name: 'MockType',
          kind: 'INPUT_OBJECT',
          inputFields: [{ name: 'field1', type: { name: 'String', kind: 'INPUT_OBJECT' }, defaultValue: null }],
          description: 'Description of MockType',
          isOneOf: false,
        },
      ],
      directives: [],
    },
  };

  it('renders argument type details for INPUT_OBJECT type', () => {
    render(<ArgItem arg={mockArg} schema={mockSchema} />);

    expect(screen.getByText('mockArg: MockType')).toBeInTheDocument();
    expect(screen.getByText('Input Fields List')).toBeInTheDocument();
  });

  it('renders argument type details for non INPUT_OBJECT type', () => {
    const mockArgNonInputObject: IntrospectionInputValue = {
      name: 'mockArg',
      type: { kind: 'SCALAR', name: 'String' },
      defaultValue: null,
    };

    const mockSchemaNonInputObject: IntrospectionQuery = {
      __schema: {
        queryType: { name: 'Query', kind: 'OBJECT' },
        mutationType: null,
        subscriptionType: null,
        types: [
          {
            name: 'MockType',
            kind: 'SCALAR',
            description: 'Description of String',
          },
        ],
        directives: [],
      },
    };

    render(<ArgItem arg={mockArgNonInputObject} schema={mockSchemaNonInputObject} />);

    expect(screen.getByText('mockArg: String')).toBeInTheDocument();
    expect(screen.queryByText('Input Fields List')).toBeNull();
    expect(screen.getByText('Description of String')).toBeInTheDocument();
  });

  it('does not render details if argument type is not found', () => {
    (findKeyValue as Mock).mockImplementation(() => null);

    render(<ArgItem arg={mockArg} schema={mockSchema} />);

    expect(screen.queryByText('Input Fields List')).toBeNull();
    expect(screen.queryByText('Description of MockType')).toBeNull();
  });
});
