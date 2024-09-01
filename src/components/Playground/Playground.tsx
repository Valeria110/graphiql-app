'use client';
import styles from './Playground.module.scss';
import { CodeEditorLanguage } from '@/types/types';
import CodeEditor from '../CodeEditor/CodeEditor';
import JsonViewer from '../JsonViewer/JsonViewer';
import PlaygroundInputs from './PlaygroundInputs/PlaygroundInputs';
import Docs from '../SectionDocs/Dosc';
import { Alert } from '@mui/material';
import { useAppSelector } from '@/hooks/storeHooks';

interface PlaygroundProps {
  language: CodeEditorLanguage;
}

export default function Playground({ language }: PlaygroundProps) {
  const { textError } = useAppSelector((state) => state.docs);

  return (
    <>
      {textError && (
        <Alert severity="error" className={styles.docsError}>
          {textError}
        </Alert>
      )}
      <div className={styles['playground-container']}>
        <Docs />
        <div className={styles.playground}>
          <PlaygroundInputs />
          <div className={styles.editorsWrapper}>
            <CodeEditor language={language} />
            <JsonViewer />
          </div>
        </div>
      </div>
    </>
  );
}
