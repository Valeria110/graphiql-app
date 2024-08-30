import { DocsSectionProps } from '@/types/types';
import { List } from '@mui/material';
import { filterSchemaTypes } from '@/utils/docsUtils';
import { IntrospectionObjectType } from 'graphql';
import { NestedItem } from './SubsectionsComponents/NestedItem';
import { DocsItem } from './DocsItem';

export default function Queries({ schema }: DocsSectionProps) {
  const allQueries = filterSchemaTypes(schema, 'Query') as IntrospectionObjectType | undefined;

  if (!allQueries) return null;

  return (
    <List component="nav">
      <NestedItem name="Queries" level={1}>
        <List component="div" disablePadding>
          {allQueries.fields.map((query) => (
            <DocsItem key={query.name} query={query} schema={schema} />
          ))}
        </List>
      </NestedItem>
    </List>
  );
}
