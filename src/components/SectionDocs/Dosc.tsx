'use client';
import { useAppSelector } from '@/hooks/storeHooks';
import Queries from './SubsectionsDocs/Queries';
import AllTypes from './SubsectionsDocs/AllTypes';
import Mutations from './SubsectionsDocs/Mutations';
import Subscriptions from './SubsectionsDocs/Subscriptions';

export default function Docs() {
  const schema = useAppSelector((state) => state.docs.schema);
  console.log(schema);

  if (!schema) {
    return <div>Loading...</div>; // заменить на кастомный
  }

  return (
    <div>
      <div>
        <h2>Documentation</h2>
        <button>x</button>
        <div>
          <AllTypes schema={schema} />
          <Queries schema={schema} />
          <Mutations schema={schema} />
          <Subscriptions schema={schema} />
        </div>
      </div>
    </div>
  );
}
