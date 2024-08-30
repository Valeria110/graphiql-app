import { NestedItem } from './NestedItem';
import docsStyles from '../../DocsStyles.module.scss';

export function DescriptionItem({ description }: { description: string }) {
  return (
    <NestedItem name="description" description={''} level={2}>
      <div className={docsStyles['args-container']}>
        <div className={docsStyles['args-list']}>
          <p>{description}</p>
        </div>
      </div>
    </NestedItem>
  );
}
