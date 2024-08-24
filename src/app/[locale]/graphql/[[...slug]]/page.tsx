import styles from './page.module.scss';
import Playground from '@/components/Playground/Playground';

export default function graphqlPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>
        <span>Graphi </span>
        <span>QL</span>
      </h1>
      <Playground language="graphql" />
    </main>
  );
}
