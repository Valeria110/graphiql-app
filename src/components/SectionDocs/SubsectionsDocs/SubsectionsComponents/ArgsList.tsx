import { findKeyValue, filterSchemaTypes } from '@/utils/docsUtils';
import { IntrospectionInputValue, IntrospectionQuery } from 'graphql';
import { ArgType } from '../ReturnType';
import { NestedItem } from './NestedItem';
import docsStyles from '../../DocsStyles.module.scss';
import { InputFieldsList } from './FieldsList';

export function ArgsList({ args, schema }: { args: readonly IntrospectionInputValue[]; schema: IntrospectionQuery }) {
  return (
    <NestedItem name="args" description={''} level={2}>
      {args.map((arg) => (
        <ArgItem key={arg.name} arg={arg} schema={schema} />
      ))}
    </NestedItem>
  );
}

export function ArgItem({ arg, schema }: { arg: IntrospectionInputValue; schema: IntrospectionQuery }) {
  const argTypeName = findKeyValue(arg.type, 'name');
  const argTypeDetails = argTypeName ? filterSchemaTypes(schema, argTypeName) : null;

  return (
    <div className={docsStyles['args-container']}>
      <div className={docsStyles['args-list']}>
        <strong>
          <ArgType type={arg.type} typeName={arg.name} className={'args-list__title'} />
        </strong>
        {argTypeDetails &&
          (argTypeDetails.kind === 'INPUT_OBJECT' ? (
            <InputFieldsList inputFields={argTypeDetails.inputFields} schema={schema} />
          ) : (
            <div>{argTypeDetails.description}</div>
          ))}
      </div>
    </div>
  );
}
