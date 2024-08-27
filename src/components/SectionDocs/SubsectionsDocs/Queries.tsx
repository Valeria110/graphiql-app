import { DocsSectionProps } from '@/types/types';
import { IntrospectionObjectType } from 'graphql';

export default function Queries({ schema }: DocsSectionProps) {
  const allQueries = schema?.__schema.types.find(({ name }) => name === 'Query') as IntrospectionObjectType | undefined;

  return (
    allQueries && (
      <div>
        {allQueries.fields.map((query) => (
          <div key={query.name}>{query.name}</div>
        ))}
      </div>
    )
  );
}
