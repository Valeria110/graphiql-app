import {
  IntrospectionInputTypeRef,
  IntrospectionNamedTypeRef,
  IntrospectionListTypeRef,
  IntrospectionNonNullTypeRef,
} from 'graphql';
import docsStyles from '../DocsStyles.module.scss';

interface ArgTypeProps {
  type: IntrospectionInputTypeRef;
  typeName: string;
}

function resolveTypeName(type: IntrospectionInputTypeRef): string {
  if (type.kind === 'LIST') {
    return `[${resolveTypeName((type as IntrospectionListTypeRef<IntrospectionInputTypeRef>).ofType)}]`;
  } else if (type.kind === 'NON_NULL') {
    return `${resolveTypeName((type as IntrospectionNonNullTypeRef<IntrospectionInputTypeRef>).ofType)}!`;
  } else {
    return (type as IntrospectionNamedTypeRef).name;
  }
}

export function ArgType({ type, typeName }: ArgTypeProps) {
  const resolvedTypeName = resolveTypeName(type);
  return <div className={docsStyles['title']}>{`${typeName}: ${resolvedTypeName}`}</div>;
}
