import { DocsSectionProps } from '@/types/types';
import { IntrospectionObjectType } from 'graphql';

export default function Mutations({ schema }: DocsSectionProps) {
  const allMutations = schema?.__schema.types.find(({ name }) => name === 'Mutation') as
    | IntrospectionObjectType
    | undefined;

  return (
    allMutations && (
      <div>
        {allMutations.fields.map((mutation) => (
          <div key={mutation.name}>{mutation.name}</div>
        ))}
      </div>
    )
  );
}
