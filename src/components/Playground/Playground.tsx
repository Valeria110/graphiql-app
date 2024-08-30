import styles from './Playground.module.scss';
import { CodeEditorLanguage } from '@/types/types';
import CodeEditor from '../CodeEditor/CodeEditor';
import JsonViewer from '../JsonViewer/JsonViewer';
import PlaygroundInputs from './PlaygroundInputs/PlaygroundInputs';

interface PlaygroundProps {
  language: CodeEditorLanguage;
}

export default function Playground({ language }: PlaygroundProps) {
  return (
    <div className={styles.playground}>
      <PlaygroundInputs />
      <div className={styles.editorsWrapper}>
        <CodeEditor language={language} />
        <JsonViewer />
      </div>
    </div>
  );
}
