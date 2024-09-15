import { describe, expect, it } from 'vitest';
import { filterSchemaTypes, findKeyValue } from './docsUtils';
import { IntrospectionObjectType, IntrospectionQuery, IntrospectionType } from 'graphql';

describe('filterSchemaTypes', () => {
  const mockIntrospectionQuery: IntrospectionQuery = {
    __schema: {
      queryType: { name: 'Query', kind: 'OBJECT' },
      mutationType: null,
      subscriptionType: null,
      types: [
        {
          name: 'User',
          kind: 'OBJECT',
          fields: [
            {
              name: 'id',
              type: { name: 'ID', kind: 'SCALAR' },
              args: [],
              isDeprecated: false,
              deprecationReason: null,
            },
            {
              name: 'name',
              type: { name: 'String', kind: 'SCALAR' },
              args: [],
              isDeprecated: false,
              deprecationReason: null,
            },
          ],
          interfaces: [],
          possibleTypes: [],
        } as IntrospectionObjectType,
      ],
      directives: [],
    },
  };

  it('should return the type object for a given name', () => {
    const result = filterSchemaTypes(mockIntrospectionQuery, 'User');
    expect(result).toEqual({
      name: 'User',
      kind: 'OBJECT',
      fields: [
        {
          name: 'id',
          type: { name: 'ID', kind: 'SCALAR' },
          args: [],
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'name',
          type: { name: 'String', kind: 'SCALAR' },
          args: [],
          isDeprecated: false,
          deprecationReason: null,
        },
      ],
      interfaces: [],
      possibleTypes: [],
    });
  });

  it('should return undefined for a non-existent type', () => {
    const result = filterSchemaTypes(mockIntrospectionQuery, 'NonExistentType');
    expect(result).toBeUndefined();
  });
});

describe('findKeyValue', () => {
  const mockObject: IntrospectionObjectType = {
    kind: 'OBJECT',
    name: 'User',
    fields: [
      {
        name: 'name',
        type: { name: 'String', kind: 'SCALAR' },
        args: [],
        isDeprecated: false,
        deprecationReason: null,
      },
      {
        name: 'type',
        type: {
          name: 'String',
          kind: 'SCALAR',
        },
        args: [],
        isDeprecated: false,
        deprecationReason: null,
      },
    ],
    interfaces: [],
  };

  it('should return the value for a given key', () => {
    expect(findKeyValue(mockObject, 'name')).toBe('User');
    expect(findKeyValue(mockObject, 'kind')).toBe('OBJECT');
  });

  it('should return the value from nested `ofType` if the key is not in the first level', () => {
    expect(findKeyValue(mockObject.fields[1].type, 'name')).toBe('String');
  });

  it('should return null for non-object types', () => {
    expect(findKeyValue(null as unknown as IntrospectionType, 'name')).toBeNull();
    expect(findKeyValue('string' as unknown as IntrospectionType, 'name')).toBeNull();
  });
});
