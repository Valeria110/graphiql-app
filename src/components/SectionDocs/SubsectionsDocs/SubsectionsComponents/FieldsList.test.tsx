import { fireEvent, render, screen } from '@testing-library/react';
import {
  IntrospectionInputObjectType,
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionQuery,
} from 'graphql';
import { describe, expect, it, Mock, vi } from 'vitest';
import { FieldsList, InputFieldsList } from './FieldsList';
import { filterSchemaTypes } from '@/utils/docsUtils';
import { baseSchema } from '@/tests/mocks/baseSchema';

vi.mock('@/utils/docsUtils', () => ({
  filterSchemaTypes: vi.fn(
    (schema, nameType) =>
      schema.__schema.types.find((type: IntrospectionInputObjectType) => type.name === nameType) || null,
  ),
  findKeyValue: vi.fn((_, key) => (key === 'name' ? 'MockType' : null)),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

describe('FieldsList', () => {
  const mockSchema: IntrospectionQuery = {
    __schema: {
      ...baseSchema.__schema,
      types: [
        {
          name: 'MockType',
          kind: 'OBJECT',
          fields: [
            {
              name: 'field1',
              description: 'Field 1 description',
              type: { kind: 'SCALAR', name: 'String' },
              args: [],
              isDeprecated: false,
              deprecationReason: null,
            },
            {
              name: 'field2',
              description: 'Field 2 description',
              type: { kind: 'OBJECT', name: 'NestedType' },
              args: [],
              isDeprecated: false,
              deprecationReason: null,
            },
            {
              name: 'MockType',
              description: 'String type description',
              args: [],
              type: { kind: 'SCALAR', name: 'MockString' },
              isDeprecated: false,
              deprecationReason: undefined,
            },
          ],
          interfaces: [],
        },
      ],
    },
  };

  it('renders fields for OBJECT type', () => {
    render(<FieldsList typeName="MockType" schema={mockSchema} />);

    expect(screen.getByText('fieldsTitle')).toBeInTheDocument();
    fireEvent.click(screen.getByText('fieldsTitle'));

    expect(screen.getAllByText('field1: String').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Field 1 description').length).toBeGreaterThan(0);
    expect(screen.getAllByText('field2: NestedType').length).toBeGreaterThan(0);
  });

  it('handles non-OBJECT type correctly', () => {
    render(<FieldsList typeName="MockType" schema={mockSchema} />);

    expect(screen.getByText('fieldsTitle')).toBeInTheDocument();
    fireEvent.click(screen.getByText('fieldsTitle'));

    expect(screen.getAllByText('String type description').length).toBeGreaterThan(0);
  });

  it('handles empty fields gracefully', () => {
    const mockEmptyObjectType: IntrospectionObjectType = {
      name: 'EmptyType',
      kind: 'OBJECT',
      fields: [],
      interfaces: [],
    };

    (filterSchemaTypes as Mock).mockImplementation((_, typeName) => {
      if (typeName === 'EmptyType') return mockEmptyObjectType;
      return null;
    });

    render(<FieldsList typeName="EmptyType" schema={mockSchema} />);

    expect(screen.queryByText('Input Fields List')).toBeNull();
    expect(screen.queryByText('Field 1 description')).toBeNull();
  });
});

describe('InputFieldsList', () => {
  const mockSchema: IntrospectionQuery = {
    __schema: {
      ...baseSchema.__schema,
      types: [
        {
          name: 'String',
          kind: 'SCALAR',
          description: 'String type description',
        },
        {
          name: 'NestedType',
          kind: 'OBJECT',
          fields: [
            {
              name: 'nestedField',
              description: 'Nested field description',
              type: { kind: 'SCALAR', name: 'String' },
              args: [],
              isDeprecated: false,
              deprecationReason: null,
            },
          ],
          interfaces: [],
        },
      ],
    },
  };

  const mockInputFields = [
    {
      name: 'field1',
      description: 'Field 1 description',
      type: { kind: 'SCALAR', name: 'String' } as IntrospectionOutputTypeRef,
      args: [],
      isDeprecated: false,
      deprecationReason: null,
    },
  ];

  it('renders input fields correctly', () => {
    render(<InputFieldsList inputFields={mockInputFields} schema={mockSchema} />);

    expect(screen.getByText('field1: String')).toBeInTheDocument();
    expect(screen.getByText('Field 1 description')).toBeInTheDocument();
  });
});
