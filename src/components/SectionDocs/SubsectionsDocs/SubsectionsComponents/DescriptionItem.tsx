import { NestedItem } from './NestedItem';
import docsStyles from '../../DocsStyles.module.scss';
import { useTranslations } from 'next-intl';

export function DescriptionItem({ description }: { description: string }) {
  const t = useTranslations('Docs');

  return (
    <NestedItem name={t('descriptionTitle')} description={''} level={2}>
      <div className={docsStyles['args-container']}>
        <div className={docsStyles['args-list']}>
          <p>{description}</p>
        </div>
      </div>
    </NestedItem>
  );
}
