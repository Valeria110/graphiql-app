import { ReactNode } from 'react';

interface Query {
  name: string;
}

export interface MockDocsItemProps {
  query: Query;
}

export interface MockNestedItemProps {
  name: string;
  children?: ReactNode;
}
