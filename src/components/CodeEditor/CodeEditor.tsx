'use client';

import styles from './CodeEditor.module.scss';
import { useAppSelector } from '@/hooks/storeHooks';
import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import EditorButtons from './EditorButtons/EditorButtons';
import { CodeEditorLanguage } from '@/types/types';

interface CodeEditorProps {
  language: CodeEditorLanguage;
}

export default function CodeEditor({ language }: CodeEditorProps) {
  const editorCodeQueryValue = useAppSelector((state) => state.graphiqlEditor.query);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(editorCodeQueryValue);
  }, [editorCodeQueryValue]);

  const handleChange = (value: string | undefined) => {
    setQuery(value ?? '');
  };

  return (
    <div className={styles.codeEditor}>
      <div className={styles.monacoEditor}>
        <Editor
          height="400px"
          width="100%"
          defaultValue={query}
          defaultLanguage={language}
          value={query}
          onChange={handleChange}
          options={{
            automaticLayout: true,
            fontSize: 16,
            fontFamily: 'Poppins',
            minimap: {
              enabled: false,
            },
            bracketPairColorization: {
              enabled: true,
            },
            formatOnPaste: true,
          }}
        />
      </div>
      <EditorButtons query={query} />
    </div>
  );
}
