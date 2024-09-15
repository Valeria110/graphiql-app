import { IntrospectionQuery } from 'graphql';

export const baseSchema: IntrospectionQuery = {
  __schema: {
    queryType: { kind: 'OBJECT', name: 'Query' },
    mutationType: { kind: 'OBJECT', name: 'Mutation' },
    subscriptionType: { kind: 'OBJECT', name: 'Subscription' },
    directives: [],
    types: [],
  },
};
