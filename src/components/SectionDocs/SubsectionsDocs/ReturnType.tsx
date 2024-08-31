import {
  IntrospectionInputTypeRef,
  IntrospectionNamedTypeRef,
  IntrospectionListTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionOutputTypeRef,
} from 'graphql';
import docsStyles from '../DocsStyles.module.scss';

interface ArgTypeProps {
  type: IntrospectionInputTypeRef | IntrospectionOutputTypeRef;
  typeName: string;
  className: string;
}

function resolveTypeName(type: IntrospectionInputTypeRef | IntrospectionOutputTypeRef): string {
  if (type.kind === 'LIST') {
    return `[${resolveTypeName((type as IntrospectionListTypeRef<IntrospectionInputTypeRef | IntrospectionOutputTypeRef>).ofType)}]`;
  } else if (type.kind === 'NON_NULL') {
    return `${resolveTypeName((type as IntrospectionNonNullTypeRef<IntrospectionInputTypeRef | IntrospectionOutputTypeRef>).ofType)}!`;
  } else {
    return (type as IntrospectionNamedTypeRef).name;
  }
}

export function ArgType({ type, typeName, className }: ArgTypeProps) {
  const resolvedTypeName = resolveTypeName(type);
  return <div className={docsStyles[className]}>{`${typeName}: ${resolvedTypeName}`}</div>;
}
