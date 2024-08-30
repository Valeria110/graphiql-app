import { DocsSectionProps } from '@/types/types';
import { List } from '@mui/material';
import { IntrospectionObjectType } from 'graphql';
import { DocsItem } from './DocsItem';
import { NestedItem } from './SubsectionsComponents/NestedItem';

export default function Mutations({ schema }: DocsSectionProps) {
  const allMutations = schema?.__schema.types.find(({ name }) => name === 'Mutation') as
    | IntrospectionObjectType
    | undefined;

  if (!allMutations) return null;

  return (
    <List component="nav">
      <NestedItem name="Mutations" level={1}>
        <List component="div" disablePadding>
          {allMutations.fields.map((mutation) => (
            <DocsItem key={mutation.name} query={mutation} schema={schema} />
          ))}
        </List>
      </NestedItem>
    </List>
  );
}
