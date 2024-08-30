import {
  IntrospectionInputObjectType,
  IntrospectionListTypeRef,
  IntrospectionNamedTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionObjectType,
  IntrospectionQuery,
} from 'graphql';

export function filterSchemaTypes(schema: IntrospectionQuery, nameType: string) {
  const result = schema?.__schema.types.find(({ name }) => name === nameType) as
    | IntrospectionObjectType
    | IntrospectionInputObjectType
    | undefined;
  return result;
}

type IntrospectionType = IntrospectionNamedTypeRef | IntrospectionListTypeRef | IntrospectionNonNullTypeRef;

export function findKeyValue(obj: IntrospectionType, key: 'name' | 'kind'): string | null {
  if (obj === null || typeof obj !== 'object') {
    return null;
  }

  if (key in obj) {
    const value = obj[key as keyof typeof obj];
    if (typeof value === 'string') {
      return value;
    }
  }

  if ('ofType' in obj && obj.ofType) {
    return findKeyValue(obj.ofType, key);
  }

  return null;
}
