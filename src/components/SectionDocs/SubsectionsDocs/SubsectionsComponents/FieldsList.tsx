import { findKeyValue, filterSchemaTypes } from '@/utils/docsUtils';
import { IntrospectionInputValue, IntrospectionField, IntrospectionQuery, IntrospectionObjectType } from 'graphql';
import { ArgType } from '../ReturnType';
import { NestedItem } from './NestedItem';
import docsStyles from '../../DocsStyles.module.scss';

export function InputFieldsList({
  inputFields,
  schema,
}: {
  inputFields: readonly IntrospectionInputValue[] | readonly IntrospectionField[];
  schema: IntrospectionQuery;
}) {
  return (
    <div className={docsStyles['fields-list']}>
      {inputFields.map((field, index) => {
        const fieldTypeName = findKeyValue(field.type, 'name');
        const fieldTypeDetails = fieldTypeName ? filterSchemaTypes(schema, fieldTypeName) : null;

        return (
          <div key={field.name} className={docsStyles['fields-list__item']}>
            <div>
              <strong className={docsStyles['fields-list__header']}>
                {`${index + 1}. `}{' '}
                <ArgType type={field.type} typeName={field.name} className={'fields-list__item-title'} />
              </strong>
            </div>
            {field.description && (
              <div>
                <strong>{'Description: '}</strong>
                {field.description}
              </div>
            )}
            {fieldTypeDetails?.description && (
              <div>
                <strong>{'Type: '}</strong>
                {fieldTypeDetails?.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function FieldsList({ typeName, schema }: { typeName: string; schema: IntrospectionQuery }) {
  const fieldTypeDetails = typeName ? filterSchemaTypes(schema, typeName) : null;

  return (
    <NestedItem name="fields" description={''} level={2}>
      {fieldTypeDetails?.kind === 'OBJECT' &&
        (fieldTypeDetails as IntrospectionObjectType).fields.map((field) => {
          const fieldTypeName = findKeyValue(field.type, 'name');
          const fieldTypeDetails = fieldTypeName ? filterSchemaTypes(schema, fieldTypeName) : null;

          return (
            <div key={field.name} className={docsStyles['args-container']}>
              <div className={docsStyles['args-list']}>
                {field.name && (
                  <div className={docsStyles['title']}>
                    {
                      <strong>
                        <ArgType type={field.type} typeName={field.name} className={'args-list__title'} />
                      </strong>
                    }
                  </div>
                )}
                {field.description && (
                  <div>
                    <strong>{'Description'}:</strong> {field.description}
                  </div>
                )}
                {fieldTypeDetails?.description && (
                  <div>
                    {<strong>{'Type: '}</strong>}
                    {fieldTypeDetails.description}
                  </div>
                )}
                {fieldTypeDetails?.kind === 'OBJECT' && (
                  <InputFieldsList inputFields={fieldTypeDetails.fields} schema={schema} />
                )}
              </div>
            </div>
          );
        })}
    </NestedItem>
  );
}
