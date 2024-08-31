import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.loaderMask} data-testid="loader">
      <div className={styles.loader} />
    </div>
  );
}

export default Loader;
