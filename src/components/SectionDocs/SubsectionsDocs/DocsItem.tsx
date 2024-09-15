import { findKeyValue } from '@/utils/docsUtils';
import { List } from '@mui/material';
import { IntrospectionField, IntrospectionQuery } from 'graphql';
import { ArgsList } from './SubsectionsComponents/ArgsList';
import { DescriptionItem } from './SubsectionsComponents/DescriptionItem';
import { FieldsList } from './SubsectionsComponents/FieldsList';
import { NestedItem } from './SubsectionsComponents/NestedItem';

export function DocsItem({ query, schema }: { query: IntrospectionField; schema: IntrospectionQuery }) {
  const typeName = findKeyValue(query.type, 'name');

  return (
    <NestedItem name={query.name} description={''} level={2}>
      <List component="div" disablePadding sx={{ pl: 4 }}>
        {query.description && <DescriptionItem description={query.description} />}
        {query.args.length > 0 && <ArgsList args={query.args} schema={schema} />}
        {typeName && <FieldsList typeName={typeName} schema={schema} />}
      </List>
    </NestedItem>
  );
}
