import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DocsItem } from './DocsItem';
import {
  IntrospectionInputTypeRef,
  IntrospectionInputValue,
  IntrospectionOutputTypeRef,
  IntrospectionQuery,
} from 'graphql';
import { baseSchema } from '@/tests/mocks/baseSchema';

vi.mock('@/utils/docsUtils', () => ({
  findKeyValue: vi.fn((type, key) => (key === 'name' ? type.name : null)),
}));

vi.mock('./SubsectionsComponents/DescriptionItem', () => ({
  DescriptionItem: vi.fn(({ description }) => <div>{description}</div>),
}));

vi.mock('./SubsectionsComponents/ArgsList', () => ({
  ArgsList: vi.fn(({ args }) => <div>{args.length > 0 ? 'Has args' : 'No args'}</div>),
}));

vi.mock('./SubsectionsComponents/FieldsList', () => ({
  FieldsList: vi.fn(({ typeName }) => <div>{typeName ? `Fields for ${typeName}` : 'No fields'}</div>),
}));

describe('DocsItem', () => {
  const mockQuery = {
    name: 'mockField',
    description: 'Mock field description',
    type: { kind: 'OBJECT', name: 'MockType' } as IntrospectionOutputTypeRef,
    args: [
      {
        name: 'arg1',
        type: { kind: 'SCALAR', name: 'String' },
        defaultValue: null,
      } as unknown as IntrospectionInputTypeRef,
    ] as unknown as IntrospectionInputValue[],
    isDeprecated: false,
    deprecationReason: null,
  };

  const mockSchema: IntrospectionQuery = {
    __schema: {
      ...baseSchema.__schema,
      types: [
        {
          kind: 'OBJECT',
          name: 'MockType',
          fields: [],
          interfaces: [],
        },
      ],
    },
  };

  it('renders DescriptionItem when query.description is provided', () => {
    render(<DocsItem query={mockQuery} schema={mockSchema} />);

    fireEvent.click(screen.getByText('mockField'));
    expect(screen.getByText('Mock field description')).toBeInTheDocument();
  });

  it('renders FieldsList when query.type has a name', () => {
    render(<DocsItem query={mockQuery} schema={mockSchema} />);

    fireEvent.click(screen.getByText('mockField'));
    expect(screen.getByText('Fields for MockType')).toBeInTheDocument();
  });
});
