import { DocsSectionProps } from '@/types/types';

export default function AllTypes({ schema }: DocsSectionProps) {
  const allTypes = schema?.__schema.types.filter(
    ({ name }) => name !== 'Query' && !name.startsWith('__') && name !== 'Mutation' && name !== 'Subscription',
  );

  return (
    allTypes && (
      <div>
        {allTypes.map((type) => (
          <div key={type.name}>{type.name}</div>
        ))}
      </div>
    )
  );
}
