'use client';
import { useAppSelector } from '@/hooks/storeHooks';
import Queries from './SubsectionsDocs/Queries';
import docsStyles from './DocsStyles.module.scss';

export default function Docs() {
  const schema = useAppSelector((state) => state.docs.schema);
  console.log(schema);

  if (!schema) {
    return <div>Loading...</div>;
  }

  return (
    <div className={docsStyles['docs-section']}>
      <div>
        <div className={docsStyles['docs-section__header']}>
          <h2 className={docsStyles['docs-section__title']}>Documentation</h2>
          <button className={docsStyles['docs-section__button-close']}>x</button>
        </div>
        <div>
          <Queries schema={schema} />
          {/* <Mutations schema={schema} />
          <Subscriptions schema={schema} /> */}
        </div>
      </div>
    </div>
  );
}
