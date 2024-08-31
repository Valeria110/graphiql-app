import { DocsSectionProps } from '@/types/types';
import { List } from '@mui/material';
import { IntrospectionObjectType } from 'graphql';
import { DocsItem } from './DocsItem';
import { NestedItem } from './SubsectionsComponents/NestedItem';

export default function Subscriptions({ schema, t }: DocsSectionProps) {
  const allSubscriptions = schema?.__schema.types.find(({ name }) => name === 'Subscription') as
    | IntrospectionObjectType
    | undefined;

  if (!allSubscriptions) return null;

  return (
    <List component="nav">
      <NestedItem name={t('subscriptionsTitle')} level={1}>
        <List component="div" disablePadding>
          {allSubscriptions.fields.map((subscription) => (
            <DocsItem key={subscription.name} query={subscription} schema={schema} />
          ))}
        </List>
      </NestedItem>
    </List>
  );
}
