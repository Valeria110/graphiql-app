import styles from './Playground.module.scss';
import { CodeEditorLanguage } from '@/types/types';
import CodeEditor from '../CodeEditor/CodeEditor';
import JsonViewer from '../JsonViewer/JsonViewer';
import { TextField } from '@mui/material';

interface PlaygroundProps {
  language: CodeEditorLanguage;
}

export default function Playground({ language }: PlaygroundProps) {
  return (
    <div className={styles.playground}>
      <TextField
        className={styles.urlUnput}
        variant="outlined"
        defaultValue="https://rickandmortyapi.com/graphql"
        placeholder="Enter endpoint url..."
        style={{ color: 'whitesmoke' }}
      />
      <TextField
        className={styles.urlUnput}
        variant="outlined"
        placeholder="Enter SDL url..."
        style={{ color: 'whitesmoke' }}
      />
      <div className={styles.editorsWrapper}>
        <CodeEditor language={language} />
        <JsonViewer />
      </div>
    </div>
  );
}
