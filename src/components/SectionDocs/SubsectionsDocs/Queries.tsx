import { DocsSectionProps } from '@/types/types';
import { ExpandMore, KeyboardArrowRight } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { ArgType } from './return';
import { filterSchemaTypes, findKeyValue } from '@/utils/docsUtils';
import docsStyles from '../DocsStyles.module.scss';
import { IntrospectionField, IntrospectionInputValue, IntrospectionObjectType, IntrospectionQuery } from 'graphql';

interface NestedItemProps {
  name: string;
  description?: string;
  level: number;
  children?: React.ReactNode;
}

const NestedItem = ({ name, description, level, children }: NestedItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ paddingLeft: `${level * 15}px` }}>
        <ListItemText primary={name} />
        {open ? <ExpandMore /> : <KeyboardArrowRight />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {description && (
          <List component="div" disablePadding>
            <div>
              <ListItemText primary={description} />
            </div>
          </List>
        )}
        {children}
      </Collapse>
    </>
  );
};

export default function Queries({ schema }: DocsSectionProps) {
  const allQueries = filterSchemaTypes(schema, 'Query') as IntrospectionObjectType | undefined;

  if (!allQueries) return null;

  return (
    <List component="nav">
      <NestedItem name="Queries" level={1}>
        <List component="div" disablePadding>
          {allQueries.fields.map((query) => (
            <QueryItem key={query.name} query={query} schema={schema} />
          ))}
        </List>
      </NestedItem>
    </List>
  );
}

function QueryItem({ query, schema }: { query: IntrospectionField; schema: IntrospectionQuery }) {
  return (
    <NestedItem name={query.name} description={''} level={2}>
      <List component="div" disablePadding sx={{ pl: 4 }}>
        {query.description && <DescriptionItem description={query.description} />}
        {query.args.length > 0 && <ArgsList args={query.args} schema={schema} />}
      </List>
    </NestedItem>
  );
}

function DescriptionItem({ description }: { description: string }) {
  return (
    <NestedItem name="description" description={''} level={2}>
      <div className={docsStyles['args-container']}>
        <div className={docsStyles['args-list']}>
          <p>{description}</p>
        </div>
      </div>
    </NestedItem>
  );
}

function ArgsList({ args, schema }: { args: readonly IntrospectionInputValue[]; schema: IntrospectionQuery }) {
  return (
    <NestedItem name="args" description={''} level={2}>
      {args.map((arg) => (
        <ArgItem key={arg.name} arg={arg} schema={schema} />
      ))}
    </NestedItem>
  );
}

function ArgItem({ arg, schema }: { arg: IntrospectionInputValue; schema: IntrospectionQuery }) {
  const argTypeName = findKeyValue(arg.type, 'name');
  const argTypeDetails = argTypeName ? filterSchemaTypes(schema, argTypeName) : null;

  return (
    <div className={docsStyles['args-container']}>
      <div className={docsStyles['args-list']}>
        <ArgType type={arg.type} typeName={arg.name} />
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

function InputFieldsList({
  inputFields,
  schema,
}: {
  inputFields: readonly IntrospectionInputValue[];
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
              {index + 1}. {field.name}: {fieldTypeName || 'Unknown type'}
            </div>
            <div>{fieldTypeDetails?.description}</div>
          </div>
        );
      })}
    </div>
  );
}
