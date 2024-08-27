import { DocsSectionProps } from '@/types/types';
import { IntrospectionObjectType } from 'graphql';

export default function Subscriptions({ schema }: DocsSectionProps) {
  const allSubscriptions = schema?.__schema.types.find(({ name }) => name === 'Subscription') as
    | IntrospectionObjectType
    | undefined;

  return (
    allSubscriptions && (
      <div>
        {allSubscriptions.fields.map((subscription) => (
          <div key={subscription.name}>{subscription.name}</div>
        ))}
      </div>
    )
  );
}
