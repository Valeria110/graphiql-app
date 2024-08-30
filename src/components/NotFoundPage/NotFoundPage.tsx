'use client';

import { Button } from '@mui/material';
import styles from './NotFoundPage.module.scss';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  const handleCLick = () => {
    router.replace('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Not found page</h1>
      <Button onClick={handleCLick} variant="contained">
        Back Home
      </Button>
    </div>
  );
}
